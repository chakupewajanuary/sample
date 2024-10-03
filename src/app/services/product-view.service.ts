import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { Products } from '../product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductViewService {
  private productUrl='/api/amazon/GetAllProducts'

  constructor(private http:HttpClient) { }

   // Loading the Api response
   getProducts(): Observable<Products[]> {
    return this.http.get<any>(this.productUrl).pipe(
      tap(Response => console.log('API response:', Response)),
      map(response => {
        // Check if the response is an array
        if (Array.isArray(response)) {
          return response.map(product => ({
            productName: product.productName,
            productPrice: product.productPrice,
            productImageUrl: product.productImageUrl,
            productDescription: product.productDescription
          }));
        } else if (response && typeof response === 'object') {
          // If it's an object, check if it has a property that contains the array
          const productsArray = Object.values(response).find(Array.isArray);
          if (productsArray) {
            return productsArray.map(product => ({
              productName: product.productName,
              productPrice: product.productPrice,
              productImageUrl: product.productImageUrl,
              productDescription: product.productDescription
            }));
          }
        }
        // If we can't find an array, return an empty array
        console.error('Unexpected API response structure:', response);
        return [];
      }),
      catchError(error => {
        console.error('Error fetching products:', error);
        return of([]);
      })
    );
  }
    //Handling the error if the Data isn't loaded 
    private handleError(error: HttpErrorResponse) {
      console.error('An error occurred:', error);
      return throwError(() => new Error('Something went wrong; please try again later.'));
    }
}
