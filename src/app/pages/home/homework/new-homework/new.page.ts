import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonAvatar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
  IonButton,
  IonInput,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBackOutline } from 'ionicons/icons';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
  standalone: true,
  imports: [
    IonLabel,
    IonItem,
    IonAccordionGroup,
    IonInput,
    IonAvatar,
    IonAccordion,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonMenuButton,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonGrid,
    IonIcon,
    IonRow,
    IonButton,
  ],
})
export class NewPage implements OnInit {
  navCtrl = inject(NavController);
  api = inject(ApiService);
  data: any;
  ngOnInit(): void {
    console.log();
  }
  constructor() {
    addIcons({ chevronBackOutline });
  }
  selectedImage: boolean = false;
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Simula datos del archivo (puedes adaptar estos datos según tu lógica)
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

  crear(): void {
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

  back() {
    this.navCtrl.back();
  }
}
