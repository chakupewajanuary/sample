import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../login.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl= '/api/amazon/Login';

  constructor(private http:HttpClient) { }

  login(loginData:Login): Observable <any> {
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.loginUrl,loginData,{ headers: {
      'Accept': 'text/plain',
      'Content-Type': 'application/json-patch+json'
    }});
  }
}
