import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, User } from '../login.interface';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { Customer } from '../customer.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl= '/api/amazon/Login';
  private getAllCustomersUrl='/api/amazon/GetAllCustomer';

  constructor(private http:HttpClient) { }

  login(loginData:Login): Observable <any> {
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.loginUrl,loginData,{ headers: {
      'Accept': 'text/plain',
      'Content-Type': 'application/json-patch+json'
    }});
  }

   
 // Loading the Api response
 getCustomer(): Observable<User[]> {
  return this.http.get<any>(this.getAllCustomersUrl).pipe(
    tap(Response => console.log('API response:', Response)),
    map(response => {
      // Check if the response is an array
      if (Array.isArray(response)) {
        return response.map(product => ({
          custId: product.custId,
          name: product.name,
          mobileNo: product.mobileNo,
          password: product.password
        }));
      } else if (response && typeof response === 'object') {
        // If it's an object, check if it has a property that contains the array
        const productsArray = Object.values(response).find(Array.isArray);
        if (productsArray) {
          return productsArray.map(product => ({
            name: product.name,
            custId: product.custId,
            mobileNo: product.mobileNo,
            password: product.password
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

