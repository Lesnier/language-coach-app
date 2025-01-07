import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  toastController = inject(ToastController);

  constructor() {}
  async showToast(msg: string,color:string) {
    const toast = await this.toastController.create({
      message: msg,
      color: color,
      position: 'top',
      duration: 1500,
    });
    toast.present();
  }
}
