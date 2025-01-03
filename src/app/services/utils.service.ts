import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  toastController = inject(ToastController);

  constructor() {}
  async showToast(message:string,color:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // Duración en milisegundos
      position: 'top', // Puede ser 'top', 'middle', o 'bottom'
      color: color, // Color del toast (opcional)
      buttons: [
        {
          side: 'end',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    toast.present();
  }
}
