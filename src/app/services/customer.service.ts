import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../customer.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = '/api/amazon/RegisterCustomer';  // Proxy target

  constructor(private http: HttpClient) { }

  registerCustomer(customer: Customer): Observable<any> {
    return this.http.post(this.apiUrl, customer);
  }
}
