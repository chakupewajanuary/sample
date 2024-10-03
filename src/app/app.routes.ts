import { Routes } from '@angular/router';
import { RegisterCustomerComponent } from './components/register-customer/register-customer.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Component } from '@angular/core';
import { ProductRegisterComponent } from './components/product-register/product-register.component';
import { MenubarComponent } from './components/menubar/menubar.component';

export const routes: Routes = [
    { path: '', redirectTo: 'register', pathMatch: 'full' },
    { path: 'order',title:'order', component: RegisterCustomerComponent },
    { path: 'login', title:'login',component: LoginComponent },
    // { path: 'login', children:[{
    //     path:'home',title:'login/home', component: DashboardComponent
    // }    
    // ] },
     { path: 'home', component: DashboardComponent },
     { path:'postproduct', component:ProductRegisterComponent},
     { path: 'navbar', component: MenubarComponent },
    
];

