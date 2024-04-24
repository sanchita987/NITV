import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  HttpHeadersInterface } from './http-interfaces';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TaxService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  gettax(id: number) {
    return this.http.get<any[]>(`${this.apiUrl}tax/${id}`, {
    });
  }
  getTax() {
    return this.http.get<any[]>(`${this.apiUrl}tax`, {
      //params: { page: 1 },
    });
  }
  registertax(registertax: any): Observable<any> {
    console.warn(registertax)
    return this.http.post<any>(`${this.apiUrl}tax`, registertax);
  }
  updateTax(taxData: any, id: number): Observable<any> {
    // Assuming you have an API endpoint for updating tax, adjust this as needed
    const apiUrl = `${this.apiUrl}tax/${id}`;
    return this.http.put(apiUrl, taxData);
  }


}





