import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { catchError, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private apiUrl = environment.apiUrl;
  private subscriptionUrl = `${this.apiUrl}subscription`;
  private customerUrl = `${this.apiUrl}customer`;

  constructor(private http: HttpClient) { }
  getsubscription(search: string, filter: string, page: number,sortOrder: string,): Observable<any[]> {
    const params = new HttpParams()
      .set('search', search)
      .set('filter', filter)
      .set('page', page.toString())
      .set('sort_order', sortOrder)
      
    return this.http.get<any[]>(this.subscriptionUrl, { params });
  }
  getsubscriptions(): Observable<any> {
    const params = new HttpParams()
    return this.http.get<any[]>(this.subscriptionUrl, { params });
  }
  getSubscriptionDetail(id: number): Observable<any> {
    return this.http.get<any>(`${this.subscriptionUrl}/${id}`, {
    });
  }
  getExtraCharges(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}extra_charges/${id}`, {
    });
  }
  postComment(commentData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'subscription_comments', commentData)
      .pipe(
        catchError(error => {
          throw 'Error posting comment: ' + error;
        })
      );
  }

  getsubscriptionList(customerId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.subscriptionUrl}`, { params: { customer_id: customerId.toString() } }).pipe(
      map((data: any) => {
        return data;
      }),
      catchError(error => {
        throw 'Error in retrieving customer comments data: ' + error;
      })
    );
  }
  registerSubscription(registerSubscription: any): Observable<any> {
    return this.http.post<any>(`${this.subscriptionUrl}/calculate`, registerSubscription);
  }

  getCusto(customerName: string, page: number): Observable<any> {
    const params = new HttpParams()
    .set('first_name', customerName)
    .set('page', page.toString());
    return this.http.get<any>(this.customerUrl, { params });
  }

  getSubscriberRelationship(): Observable<any> {
    return this.http.get<any[]>(`${this.subscriptionUrl}/relationships`);
  }

  getProduct(page?: number): Observable<any> {
    let params = new HttpParams();
    if (page) {
      params = params.set('page', page.toString());
    }
    return this.http.get<any>(`${this.apiUrl}product`, { params });
  }
  
  getProductDetails(id: number): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}product/${id}`);
  }
}