import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  prodctRegister } from '../product.interface';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdvertiseService {

  //oobject hold http request api for product creats
  registerproductUrl='/api/amazon/CreateProduct';

  //api for the complaint
  private apiUrl = '/api/Complaint/AddNewDepartment';

  //api for creating categories
  private categoryUrl='/api/amazon/CreateNewCategory';

  
 
  constructor(private http:HttpClient) { }

  //used for the parameter
  // ProductId: number,ProductSku: string, ProductName: string,ProductPrice: number,ProductShortName: string,ProductDescription: string,CreatedDate: string,DeliveryTimeSpan: string,CategoryId: number,ProductImageUrl: string,categoryName:string

  registerProduct(register:{  ProductId: number, ProductSku: string, ProductName: string,ProductPrice: number,ProductShortName: string, ProductDescription: string, DeliveryTimeSpan: string ,ProductImageUrl: string, CreatedDate: string, CategoryId: number}): Observable<any>{
    const headers=new HttpHeaders({
       'Content-Type': 'application/json-patch+json',
       'accept': 'text/plain'
    })
    return this.http.post(this.registerproductUrl,register,{headers});
  }
  

  // Error handling method
  private handleError(operation = 'operation', result?: any) {
    return (error: HttpErrorResponse): Observable<any> => {
      console.error(`${operation} failed: ${error.message}`);
      
      // Here, you could return a more user-friendly error message
      return throwError(() => new Error('Something went wrong; please try again later.'));
    };
  }
  

// Method to add a new department
addNewDepartment(department: { departmentId: number, departmentName: string, departmentLogo: string }): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json-patch+json',
    'Accept': 'text/plain'
  });
  return this.http.post(this.apiUrl, department, { headers });
}

//method for posting categories
addNewCategory(categories:{  "CategoryId": number,"CategoryName": "string","ParentCategoryId": number}): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json-patch+json',
    'Accept': 'text/plain'
  });
  return this.http.post(this.categoryUrl,categories,{headers})
}
    
  

}





