import { Component, OnInit } from '@angular/core';
import { ProductViewService } from '../../services/product-view.service';
import { Products } from '../../product.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  //object for the product interface
  product:Products[]=[]
  
  // Track which image is enlarged
  enlargedImageIndex: number | null = null; 

  constructor(private productservice:ProductViewService){}

  ngOnInit(): void {
    this.getLoadProduct()
  }
 //for loarding data from the service
  getLoadProduct(){
    this.productservice.getProducts().subscribe({
      next:(data)=>{
        this.product=data
        console.log('this product from our store',this.product);

      }
    })
    
  }
  toggleImageSize(index: number) {
    console.log(`Image clicked: ${index}`);
    if (this.enlargedImageIndex === index) {
      this.enlargedImageIndex = null; // If the same image is clicked, revert
    } else {
      this.enlargedImageIndex = index; // Set the current index as enlarged
    }
  }
  

  //for the button
  openModal(){}

}
