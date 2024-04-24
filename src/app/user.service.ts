import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { HttpParams} from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;
  private registerUrl = `${this.apiUrl}user`;

  constructor(private http: HttpClient) { }

  getuser(page: number, sortBy: string, sortOrder: string, per_page : number) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('sort_by', sortBy)
      .set('sort_order', sortOrder)
      .set('per_page', per_page.toString())
    return this.http.get<any[]>(`${this.apiUrl}user`, { params }).pipe(
        map((data: any) => {data['data']['items'].forEach((element: any) => {
            element.text = element.is_active ? 'Active' : 'Inactive';
          });
          return data;
        })
      );
  }
  
  getusers(id: number) {
   return this.http.get<any>(`${this.apiUrl}user/${id}/detail`);
  }

  register(data: any): Observable<any> {

    return this.http.post(this.registerUrl, data);
  }
  updateUser(id: number, updatedData: any): Observable<any> {
    const url = `${this.apiUrl}user/${id}`;
    return this.http.put<any>(url, updatedData);
  }
  
  registerUser(userData: any) {
    return this.http.post<any>(this.registerUrl, userData);
  }
}












