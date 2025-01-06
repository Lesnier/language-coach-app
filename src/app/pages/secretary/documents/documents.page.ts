import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonMenuButton,
  IonRow,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonList,
  IonCardContent,
  IonText,
  IonItemOption,
  IonItemOptions,
  IonLabel,
  IonItem,
  IonItemSliding,
  IonListHeader,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  archive,
  chevronBackOutline,
  cloudDownloadOutline,
  trashOutline,
} from 'ionicons/icons';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
  standalone: true,
  imports: [
    IonListHeader,
    IonItemSliding,
    IonItem,
    IonLabel,
    IonItemOptions,
    IonItemOption,
    IonText,
    IonCardContent,
    IonList,
    IonContent,
    IonHeader,
    IonIcon,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCol,
    IonGrid,
    IonRow,
    IonButtons,
    IonMenuButton,
    RouterLink,
  ],
})
export class DocumentsPage implements OnInit {
  navCtrl = inject(NavController);
  api = inject(ApiService);

  constructor() {
    addIcons({ chevronBackOutline, cloudDownloadOutline, trashOutline });
  }
  file: any[] = [];
  documentos: any[] = [];

  ngOnInit() {
    const token = localStorage.getItem('access_token');
    if (token)
      this.api.getFiles(token).subscribe((res) => {
        res.forEach((element: any) => {
          let a = JSON.parse(element.file);

          this.file.push(a[0].original_name);
        });
        this.filterPdfFiles();
      });
  }

  back() {
    this.navCtrl.back();
  }

  filterPdfFiles() {
    this.documentos = this.file.filter((file) => file.endsWith('.pdf'));
  }
}
