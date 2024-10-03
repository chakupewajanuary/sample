import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Login, User } from '../../login.interface';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Customer } from '../../customer.interface';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DashboardComponent, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginData: Login = { UserName: '', UserPassword: '' }; // Login interface object
  errorMessage: string = '';
  loginForm: FormGroup;

  // For loading customers
  customers: User[] = [];

  constructor(
    private fb: FormBuilder,
    private loginservice: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      UserName: ['', Validators.required],
      UserPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Load customers when component initializes
    this.getLoadCustomer();
  }

  // Load customers from the service
  getLoadCustomer(){
    this.loginservice.getCustomer().subscribe({
      next: (data) => {
        this.customers = data;
        console.log('Products:', this.customers);
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.error('Client-side error:', error.error.message);
          } else {
            console.error(`Server-side error: ${error.status} ${error.statusText}`);
            console.error('Error body:', error.error);
          }
        }
      }
    });
  }

  // Handle the login process
  loginn(): void {
    if (!this.loginData.UserName || !this.loginData.UserPassword) {
      this.errorMessage = 'Please fill in both username and password.';
      return;
    }
    debugger;

    // Check if the customer exists in the loaded customers list
    const customerExists = this.customers.some(
      (cust:User ) =>
        cust.name === this.loginData.UserName &&
        cust.password === this.loginData.UserPassword
    );

    if (customerExists) {
      // Perform login request if customer exists
      this.loginservice.login(this.loginData).subscribe({
        next: (response) => {
          console.log('Login successful!', response);
          // Navigate to order page on successful login
          this.router.navigate(['/home']); 
        },
        error: (error) => {
          this.errorMessage = 'Login failed. Wrong UserName or Password.';
          console.error(error);
        },
      });
    } else {
      this.errorMessage = 'Invalid user. Please check your details or register.';
      // Navigate to order page on register page
      this.router.navigate(['/order']);
    }
  }
}
