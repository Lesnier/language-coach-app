import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Availability } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  logout(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/logout`, {}, { headers });
  }

  getAgendas(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    console.log('API: Fetching agendas');

    return this.http.get<any>(`${this.apiUrl}/agendas`, { headers }).pipe(
      tap((response) => console.log('API: Agendas fetched successfully')),
      catchError((error) => {
        console.error('API: Error fetching agendas:', error);
        return throwError(error);
      })
    );
  }

  postAgenda(data: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    console.log('API: Posting agenda with data:', data);

    return this.http
      .post<any>(`${this.apiUrl}/agendas`, data, { headers })
      .pipe(
        tap((response) => console.log('API: Agenda post response:', response)),
        catchError((error) => {
          console.error('API: Error posting agenda:', error);
          return throwError(error);
        })
      );
  }

  deleteAgenda(agendaId: number, token: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return this.http.delete(`${this.apiUrl}/agendas/${agendaId}`, { headers });
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

  getProfessors(token: string) {
    return this.http.get<{ message: string; Professors: any[] }>(
      `${this.apiUrl}/professors`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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

  updatePassword(data: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/update-password`, data, { headers });
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

  uploadProfilePicture(formData: FormData, token: string) {
    console.log('API: Uploading profile picture'); // Debugging log
    return this.http
      .post(`${this.apiUrl}/user/profile-picture`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        tap(() => console.log('API: Profile picture uploaded successfully')), // Debugging log
        catchError((error) => {
          console.error('API: Error uploading profile picture:', error); // Debugging log
          return throwError(error);
        })
      );
  }

  updateUserProfile(formData: FormData, token: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/update-profile`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private daysAvailableSubject = new BehaviorSubject<Availability[]>([]); // Inicia con un array vacío
  daysAvailable$ = this.daysAvailableSubject.asObservable(); // Observable accesible desde fuera

  getAvailabilities(token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http
      .get<Availability[]>(`${this.apiUrl}/availabilities`, { headers })
      .subscribe((availabilities) => {
        this.daysAvailableSubject.next(availabilities);
      });
  }

  getPaymentDetails(token: string, paymentId: number) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<any>(`${this.apiUrl}/payments/${paymentId}`, {
      headers,
    });
  }

  getPayments(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/payments`, { headers });
  }

  uploadPaymentReceipt(token: string, paymentId: number, base64Image: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const body = {
      image: base64Image,
    };
    return this.http.post<any>(
      `${this.apiUrl}/payments/${paymentId}`,
      body,
      { headers }
    );
  }

  createPaymentReceipt(token: string, billId:number, base64Image: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const body = {
      image: base64Image,
      billId
    };
    return this.http.post<any>(
      `${this.apiUrl}/payments`,
      body,
      { headers }
    );
  }

  getBills(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/bills`, { headers });
  }

  getBillDetails(token: string, billId: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/bills-detail/${billId}`, { headers });
  }
}
