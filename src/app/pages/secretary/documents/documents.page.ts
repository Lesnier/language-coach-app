import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
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
  IonLabel,
  IonItem,
  IonListHeader,
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
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
    IonItem,
    IonLabel,
    IonList,
    IonContent,
    IonHeader,
    IonIcon,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButton,
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
  router = inject(Router);

  constructor() {
    addIcons({ chevronBackOutline, cloudDownloadOutline, trashOutline });
  }
  file: any[] = [];
  documentos: any[] = [];
   apiUrl = 'https://language-coach-back.lesinnovations.tech/storage/';

  ngOnInit() {
    const token = localStorage.getItem('access_token');
    if (token)
      this.api.getFiles(token).subscribe((res) => {

        res.forEach((element: any) => {
          if (element.file != null) {
            let a = JSON.parse(element.file);
            this.file.push(a[0]);
          }
        });
        this.filterPdfFiles();

      });
  }

  back() {
    this.navCtrl.back();
  }

  filterPdfFiles() {
    this.documentos = this.file.filter((file) => file.original_name.endsWith('.pdf'));
  }
  view(link: string) {
    this.router.navigate([this.apiUrl + link]);
  }
}
