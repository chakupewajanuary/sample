import { Routes } from '@angular/router';
import { RegisterCustomerComponent } from './components/register-customer/register-customer.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Component } from '@angular/core';

export const routes: Routes = [
    { path: '', redirectTo: 'register', pathMatch: 'full' },
    { path: 'order',title:'order', component: RegisterCustomerComponent },
    { path: 'login', title:'login',component: LoginComponent },
    // { path: 'login', children:[{
    //     path:'home',title:'login/home', component: DashboardComponent
    // }    
    // ] },
     { path: 'home', component: DashboardComponent },
    
];

