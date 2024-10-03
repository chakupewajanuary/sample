import { Component, inject, OnInit } from '@angular/core';
import { AdvertiseService } from '../../services/advertise.service';
import { prodctRegister } from '../../product.interface';
import { CommonModule, DatePipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-register',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './product-register.component.html',
  styleUrl: './product-register.component.scss'
})
export class ProductRegisterComponent implements OnInit {
  
  
  // Array to hold the registered products
product: prodctRegister[] = []; // This is the array where new products will be pushed

 // FormGroup to handle product form submission
 productForm: FormGroup;


  errorMessage: string | undefined;
  
  constructor(private registerproduct:AdvertiseService,private route:Router){
      // Initialize FormGroup with all required fields
      this.productForm = new FormGroup({
        ProductId: new FormControl(0, [Validators.required]),
        ProductSku: new FormControl('', [Validators.required]),
        ProductName: new FormControl('', [Validators.required]),
        ProductPrice: new FormControl(0, [Validators.required]),
        ProductShortName: new FormControl('', [Validators.required]),
        ProductDescription: new FormControl('', [Validators.required]),
        CreatedDate: new FormControl(new Date().toISOString(), [Validators.required]),
        DeliveryTimeSpan: new FormControl('', [Validators.required]),
        CategoryId: new FormControl(0, [Validators.required]),
        ProductImageUrl: new FormControl('', [Validators.required]),
        categoryName: new FormControl('') // Optional field
      });
  }
  //livecycle method
  ngOnInit(): void { 
  }
// Submit form and register product via POST request
 

//for class in terface imported and initalize
productnew :any={
  // "ProductId": 0,
 "ProductSku": "",
//  "ProductName": "",
  // "ProductPrice": 0,
  "ProductShortName": "",
  // "ProductDescription": "",
  // "CreatedDate":DatePipe,// new Date().toISOString(),
//  "DeliveryTimeSpan": "",
  // "CategoryId": 0,
  // "ProductImageUrl": "",
  // "categoryName":""

}
//for the categories
categoryNew: any = {
  "CategoryId": 0,
  "CategoryName": '',
 " ParentCategoryId": 0
};

// for add categories
addCategory() {
    // Check if ProductShortName is empty, if so, set it to ProductName
    if (this.productnew.ProductShortName === '') {
      this.productnew.ProductShortName = this.productnew.ProductName;
    }
  
  this.registerproduct.addNewCategory(this.categoryNew).subscribe({
    next:(res:any)=>{
      if(res.result){
        alert('ur create new category succesfully');
      }
      else{
        alert(res.errorMessage);
      }
    }
  })
}

// for add product
addProduct(){
  this.registerproduct.registerProduct(this.productnew).subscribe({
    next:(res:any)=>{
     if(res.result){
      alert('ure create product successfully')
      console.log('this product created',this.productnew)
     }
     else{
      alert(res.message)
     }
    },
   
  })
}




}

