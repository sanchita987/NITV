import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getpayment() {
    console.log("payment")
    return this.http.get<any[]>(environment.apiUrl + 'payment').pipe(
      map((data: any) => {
        data['data']['items'].forEach((element: any) => {
          element.text = element.status ? 'success' : 'failed';
        });
        return data;
      })
    );
  }
  getPayment(id :number) {
    return this.http.get<any[]>( `${environment.apiUrl}payment/${id}`, {
    });
  }
  getPay(params: { filter: string, search: string, page: number, sort_order: string }): Observable<any> {
    const { filter, search, page, sort_order } = params;
    const paramsObj = new HttpParams()
      .set('filter', filter)
      .set('search', search)
      .set('page', page.toString())
      .set('sort_order', sort_order);

    return this.http.get<any[]>(environment.apiUrl + 'payment', {
      params: paramsObj
    }).pipe(
      map((response: any) => {
        response['data']['items'].forEach((element: any) => {
          // You can perform any mapping or modification here if needed
          element.text = element.status ? 'Success' : 'Failed';
        });
        return response;
      })
    );
  }

  getPayments(customerId: number): Observable<any[]> {
    let params = new HttpParams()
      .set('customer_id', customerId)  
    return this.http.get<any[]>(environment.apiUrl + 'payment', { params }).pipe(
      catchError(error => {
        throw 'Error in retrieving payment data: ' + error;
      })
    );
  }
  
  getPendingpayments(customerId: number): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl + 'pending_payments', { params: { customer_id: customerId.toString() } }).pipe(
      map((data: any) => {
        return data;
      }),
      catchError(error => {
        throw 'Error in retrieving pending payment data: ' + error;
      })
    );
  }
  getCustomercomments(customerId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}customer_comments/${customerId}`, { params: { customer_id: customerId.toString() } }).pipe(
      map((data: any) => {
        return data;
      }),
      catchError(error => {
        throw 'Error in retrieving customer comments data: ' + error;
      })
    );
  }

  getSubscriptioncomments(subscriptionId: number) {
    return this.http.get<any>(`${environment.apiUrl}subscription_comments/${subscriptionId}` , {
    });
  }
  postComment(commentData: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'customer_comments', commentData)
      .pipe(
        catchError(error => {
          throw 'Error posting comment: ' + error;
        })
      );
  }
  deleteComment(commentId: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}customer_comments/${commentId}`)
      .pipe(
        catchError(error => {
          throw 'Error deleting comment: ' + error;
        })
      );
  }
  
  getCusto(customerName: string, page: number): Observable<any> {
    const params = new HttpParams()
      .set('first_name', customerName)
      .set('page', page.toString());
    return this.http.get<any>(`${this.apiUrl}customer`, { params });
  }
  getPaymentmode(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}payment_mode`);
  }
  getInvoiceByCustomerId(customerId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}invoice?page=1&per_page=50&customer_id=${customerId}&sort_by=invoice_due_date&filter=unpaid`);
  }
  savePayment(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}payment`, data);
  }

  getPaymentDetail(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}payment/${id}`, {
    });
  }
}




