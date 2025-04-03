import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NavController } from '@ionic/angular';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  chevronBackOutline,
  cloudDownloadOutline,
  trashOutline,
} from 'ionicons/icons';
import { ApiService } from 'src/app/services/api.service';
import { environment } from '../../../../environments/environment';
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
  apiUrl = environment.apiUrl;

  ngOnInit() {
    this.getFiles();
  }
  getFiles() {
    const token = localStorage.getItem('access_token');
    if (token)
      this.api.getFiles(token).subscribe((res) => {
        this.documentos = res.map(
          (doc: {
            file: string;
            name: any;
            created_at: string | number | Date;
          }) => {
            const fileData = JSON.parse(doc.file)[0];
            return {
              name: doc.name,
              upload_date: new Date(doc.created_at).toLocaleDateString(),
              original_name: fileData.original_name,
            };
          }
        );
        console.log(this.documentos);
      });
  }

  back() {
    this.navCtrl.back();
  }

  filterPdfFiles() {
    this.documentos = this.file.filter((file) => {
      file.name.endsWith('.pdf');
    });
    console.log(this.documentos);
  }
  view(link: string) {
    this.router.navigate([this.apiUrl + link]);
  }
}
