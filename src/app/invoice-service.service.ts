import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable,map } from 'rxjs';
import { environment } from '../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class InvoiceServiceService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }


  getInvo(data: any): Observable<any[]> {
    let params = new HttpParams();
    if (data.customer_id) {
      params = params.set('customer_id', data.customer_id.toString());
    }

    return this.http.get<any[]>(environment.apiUrl + 'invoice', {
      params: params
    }).pipe(
      map((response: any) => {
        response.data.items.forEach((element: any) => {
          element.text = element.status ? 'Paid' : 'overdue';
        });
        return response;
      })
    );
  }

  getInvoice(params: { filter: string, search: string, page: number, sort_order: string }): Observable<any> {
    const { filter, search, page, sort_order } = params;
    const paramsObj = new HttpParams()
      .set('filter', filter)
      .set('search', search)
      .set('page', page.toString())
      .set('desc', sort_order);

    return this.http.get<any[]>(environment.apiUrl + 'invoice', {
      params: paramsObj
    }).pipe(
      map((response: any) => {
        response['data']['items'].forEach((element: any) => {
          element.text = element.status ? 'Paid' : 'Overdue';
        });
        return response;
      })
    );
  }
  
  getInvoices(id: number) {
    return this.http.get<any>( `${environment.apiUrl}invoice/${id}`, {
    })
  }

  getInv(subscriptionId: number) {
    return this.http.get<any>('environment.apiUrl + invoice?subscription_id=' + subscriptionId, {
    });
  }

  private registerUrl = environment.apiUrl + 'invoice';
  register(data: any): Observable<any> {
    return this.http.post(this.registerUrl, data);
  }
}





