import { inject, Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  toastController = inject(ToastController);
  loadingController = inject(LoadingController);
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
}
