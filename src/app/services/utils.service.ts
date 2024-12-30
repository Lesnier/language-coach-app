import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  apiService = inject(ApiService);
  userDetails: any;
  constructor() {}

  loadUser(): User {
    return JSON.parse(localStorage.getItem('user') ?? '{}');
  }
}
