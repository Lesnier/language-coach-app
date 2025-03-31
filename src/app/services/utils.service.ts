import { inject, Injectable } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  toastController = inject(ToastController);
  loadingController = inject(LoadingController);
  alertController = inject(AlertController);
  private activeLoader: HTMLIonLoadingElement | null = null;

  constructor() {}

  async showToast(msg: string, color: string) {
    const toast = await this.toastController.create({
      message: msg,
      color: color,
      position: 'top',
      duration: 1500,
    });
    toast.present();
  }

  async showLoading(
    message: string = 'Please wait...',
    spinner:
      | 'bubbles'
      | 'circles'
      | 'circular'
      | 'crescent'
      | 'dots'
      | 'lines'
      | 'lines-small' = 'bubbles'
  ) {
    // Dismiss any existing loader first
    if (this.activeLoader) {
      await this.activeLoader.dismiss().catch(() => {});
      this.activeLoader = null;
    }

    const loading = await this.loadingController.create({
      message: message,
      spinner: spinner,
    });

    this.activeLoader = loading;
    await loading.present();
    return loading;
  }

  async dismissLoading(loading?: HTMLIonLoadingElement) {
    try {
      // Use provided loader or fallback to active loader
      const loaderToDismiss = loading || this.activeLoader;

      if (loaderToDismiss) {
        await loaderToDismiss.dismiss();
        if (loaderToDismiss === this.activeLoader) {
          this.activeLoader = null;
        }
      }
    } catch (err) {
      // Handle case where loader was already dismissed
      console.log('Error dismissing loader, might already be dismissed');
      this.activeLoader = null;
    }
  }

  /**
   * Shows a confirmation alert with custom buttons and handlers
   * @param header The header text
   * @param message The message text
   * @param buttons Array of buttons with text, role and handler
   * @returns The alert instance
   */
  async showConfirm(
    header: string,
    message: string,
    buttons: Array<{
      text: string;
      role?: string;
      handler?: () => void | boolean;
    }>
  ) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons,
      cssClass: 'confirmation-alert',
      backdropDismiss: false, // Prevent dismissing by clicking outside
    });

    await alert.present();
    return alert;
  }
}
