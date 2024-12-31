import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../models/interfaces';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  apiService = inject(ApiService);
  navCtrl = inject(NavController)
  userDetails: any;
  constructor() {}

  loadUser(): User {
    return JSON.parse(localStorage.getItem('user') ?? '{}');
  }

  back(){
    this.navCtrl.back();
  }
}
