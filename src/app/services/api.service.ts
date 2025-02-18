import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Availability} from "../models/interfaces";
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // private apiUrl = 'https://language-coach-back.lesinnovations.tech/api';
  public apiUrl = 'http://localhost:8000/api';

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

  getCourse(token: string, id: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/courses/${id}`, { headers });
  }

  getUserDetails(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/user`, { headers });
  }

  getForums(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/forums`, { headers });
  }

  getThreads(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/threads`, { headers });
  }

  getStudents(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/students`, { headers });
  }

  postThreadReply(
    token: string,
    threadId: any,
    response: string
  ): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = { response };
    return this.http.post(`${this.apiUrl}/threadreply/${threadId}`, body, {
      headers,
    });
  }
  getInfo(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/user-info`, { headers });
  }

  changePassword(data: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/change-password`, data, { headers });
  }

  getTask(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/tasks`, { headers });
  }
  deleteTask(token: string, id: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/tasks/${id}`, { headers });
  }
  getFiles(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/files`, { headers });
  }

  getPayments(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/payments`, { headers });
  }
  uploadFile(token: string, data: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(data);

    return this.http.post(`${this.apiUrl}/files`, data, { headers });
  }

  uploadTask(token: string, data: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/tasks`, data, { headers });
  }
  uploadPayment(token: string, data: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/payments`, data, { headers });
  }

  private daysAvailableSubject = new BehaviorSubject<Availability[]>([]); // Inicia con un array vacío
  daysAvailable$ = this.daysAvailableSubject.asObservable(); // Observable accesible desde fuera

  getAvailabilities(token: string){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<Availability[]>(`${this.apiUrl}/availabilities`, { headers }).subscribe( availabilities => {
      this.daysAvailableSubject.next(availabilities);
    });
  }





}
