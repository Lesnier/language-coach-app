import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// interface LoginResponse {
//   access_token: string;
//   token_type: string;
// }

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://language-coach-back.lesinnovations.tech/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  logout(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/logout`, {}, { headers });
  }

  getAgendas(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/agendas`, { headers });
  }

  postAgenda(data: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/agendas`, data, { headers });
  }
  
  getCourses(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/courses`, { headers });
  }

  getCourse(token: string,id:any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/courses/${id}`, { headers });
  }


  getUserDetails(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/user`, { headers });
  }

 changePassword(data: {current_password: string;  new_password: string; confirm_password: string;}, token:string): Observable<any> {
  const headers = new HttpHeaders().set('Authorization',`Bearer${token}`);
    return this.http.post(`${this.apiUrl}/change-password`, data ,{headers});
  }


}
