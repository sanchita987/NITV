import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PermissionServiceService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getPermission(module_values: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}permissions/`+localStorage.getItem ('user_id'), {
      params: { module_values }
    });
  }
}








