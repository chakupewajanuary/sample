import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../customer.interface';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-customer',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './register-customer.component.html',
  styleUrl: './register-customer.component.scss'
})
export class RegisterCustomerComponent implements OnInit {
  customer!: Customer; 
  isSignDivVisible = false;
  constructor(private customerService:CustomerService,private router: Router){}

  ngOnInit(): void {
    this.customer = {
      CustId: 0,
      Name: '',
      MobileNo: '',
      Password: ''
    };
    
  }
  onRegister() {
    confirm('welcome to register our partiner in busines');
    if(this.customer!=null){
      this.customerService.registerCustomer(this.customer).subscribe({
        next: (response) => {
          console.log('Customer registered successfully', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error registering customer', error);
        },
        complete: () => {
          console.log('Registration process completed.');
        }
      },
     
    );
      
    }
    else{
      alert("please fill all the above space") ; 
    }
   
  }
  login() {
    this.router.navigate(['/login']);
  }
}
