import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
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
  documentOutline,
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
    addIcons({
      chevronBackOutline,
      cloudDownloadOutline,
      trashOutline,
      documentOutline,
    });
  }
  file: any[] = [];
  documentos: any[] = [];
  apiUrl = environment.apiUrl;

  ngOnInit() {
    this.getFiles();

    // Subscribe to router events to detect when navigating back to this page
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Refresh the list when navigating back to this page
        if (event.url === '/documents') {
          this.getFiles();
        }
      }
    });
  }

  getFiles() {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.api.getFiles(token).subscribe((res: any[]) => {
        this.documentos = res.map((doc) => {
          let downloadLink = '';
          let originalName = '';

          // Handle different document formats
          if (
            doc.file &&
            typeof doc.file === 'string' &&
            doc.file.startsWith('[')
          ) {
            // Format 1: JSON string array format
            try {
              const fileData = JSON.parse(doc.file)[0];
              downloadLink = fileData.download_link;
              originalName = fileData.original_name;
            } catch (e) {
              console.error('Error parsing file data:', e);
            }
          } else if (doc.file && typeof doc.file === 'string') {
            // Format 2: Direct file path
            downloadLink = doc.file;
            originalName = doc.name;
          }

          return {
            id: doc.id,
            name: doc.name,
            upload_date: new Date(doc.created_at).toLocaleDateString(),
            type: doc.type,
            download_link: downloadLink,
            original_name: originalName || doc.name,
          };
        });
        console.log('Processed documents:', this.documentos);
      });
    }
  }

  back() {
    this.navCtrl.back();
  }

  filterPdfFiles() {
    this.documentos = this.file.filter((file) => {
      return file.name.endsWith('.pdf');
    });
    console.log(this.documentos);
  }

  view(link: string) {
    window.open(this.apiUrl + '/' + link, '_blank');
  }

  downloadDocument(downloadLink: string) {
    window.open(this.apiUrl + '/' + downloadLink, '_blank');
  }

  ionViewWillEnter() {
    // Refresh documents list whenever the view is about to enter
    this.getFiles();
  }
}
