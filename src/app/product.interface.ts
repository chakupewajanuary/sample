import { Pipe } from "@angular/core";

export interface Products {
  productName: string;
  productPrice: number;
  productImageUrl: string;
  productDescription: string;
}

export interface prodctRegister {
  ProductId: number;
  ProductSku: string;
  ProductName: string;
  ProductPrice: number;
  ProductShortName: string;
  ProductDescription: string;
  CreatedDate: string;
  DeliveryTimeSpan: string;
  CategoryId: number;
  ProductImageUrl: string;
  categoryName:string;
}
