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
  
  //for the date in the footer
  // currentYear: number=new Date().getFullYear();

  // Track which image is enlarged
  enlargedImageIndex: number | null = null; 

  constructor(private productservice:ProductViewService){}

  ngOnInit(): void {
    this.getLoadProduct()
    // this.currentYear= new Date().getFullYear();
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
  

  //path for the image
  // fallbackImage:string= "assets/image/mzumbe.jpeg";
  // image1:string="assets/mzumbe.jpeg";
  fallbackImage:string="https://dummyimage.com/400x300/00ff00/000";

  getImageUrl(imageUrl: string): string {
    console.log(`this my image from my computer`,this.fallbackImage)
    // return imageUrl && imageUrl.trim() !== '' ? imageUrl : this.fallbackImage; // Check if imageUrl is valid
    return imageUrl && imageUrl.trim() !== '' ? imageUrl : this.fallbackImage;
 }

//  (source cloudcode.io)If the API returns a null or undefined image URL, getImageUrl will use the default image.
 getImageUr(product: Products): string {
  return product.productImageUrl || this.fallbackImage;
}

//If an invalid URL somehow gets through and the image fails to load, it's replaced with the default image (
onImageError(product: Products) {
  product.productImageUrl = this.fallbackImage;
}

}
