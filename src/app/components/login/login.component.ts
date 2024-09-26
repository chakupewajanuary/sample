import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Login } from '../../login.interface';
import {  FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DashboardComponent,FormsModule,CommonModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
   loginData: Login = { UserName: '', UserPassword: '' }; // Login interface object
   errorMessage: string = '';

  constructor(
    private loginservice:LoginService,
    private router:Router){ 
  
    }

  ngOnInit(): void {
    // this.login();
  }

  login() {
    if (!this.loginData.UserName || !this.loginData.UserPassword) {
      this.errorMessage = 'Please enter both username and password.';
      return;
    }
    debugger;
    
    confirm('are sure you want to login?');
    this.loginservice.login(this.loginData).subscribe({
      next: (response) => {
        // console.log('Login successful', response);
        // console.log("this customer details",this.loginData);
        // this.router.navigate(['/home']);

         // Check for the correct response from the API
        if (response.success) {
          console.log('Login successful', response);
          // If successful, navigate to the dashboard
          this.router.navigate(['/home']);
        }
       else {
          // If the login fails, display an error message
          this.errorMessage = 'Invalid login credentials. Please register if you haven\'t.';
          console.log('Login failed', response.message);
          this.router.navigate(['/order']);
        }
        
      },
      error: (err) => {
        this.errorMessage = 'Invalid login credentials';
        console.error('Login failed', err);
        this.router.navigate(['/order']);
      }
      
    }
  );
  }
  

}
