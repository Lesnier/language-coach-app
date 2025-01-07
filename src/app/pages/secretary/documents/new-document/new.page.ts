import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonAvatar,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
  IonButton,
} from '@ionic/angular/standalone';
import { ApiService } from 'src/app/services/api.service';
import { NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { chevronBackOutline } from 'ionicons/icons';
@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
  standalone: true,
  imports: [
    IonAvatar,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonMenuButton,
    IonCol,
    IonGrid,
    IonIcon,
    IonRow,
    IonButton,
  ],
})
export class NewPage implements OnInit {
  api = inject(ApiService);
  navCtrl = inject(NavController);
  constructor() {
    addIcons({chevronBackOutline})
  }
  data: any;
  selectedDocument: string | null = null;

  submit(): void {
    if (!this.data.name || !this.data.type || !this.data.file) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const payload = {
      name: this.data.name,
      type: this.data.type,
      file: this.data.file,
    };

console.log(payload);

    const token = localStorage.getItem('access_token');
    if (token)
      this.api.uploadFile(token, payload).subscribe((res) => {
        console.log(res);
      });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.data = {
        name: file.name,
        type: file.type,
        file: JSON.stringify([
          {
            download_link: `files/${new Date().toLocaleString('en-US', {
              month: 'long',
            })}${new Date().getFullYear()}/${file.name.replace(/ /g, '_')}`,
            original_name: file.name,
          },
        ]),
      };
    }
  }

  back() {
    this.navCtrl.back();
  }

  ngOnInit() {

  }
}
