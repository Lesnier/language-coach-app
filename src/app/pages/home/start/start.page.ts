import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
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
  IonIcon,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonMenuButton,
  IonRouterLink,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  calendarOutline,
  calendarSharp,
  chatbubbleSharp,
  checkboxSharp,
  layersOutline,
  layersSharp,
} from 'ionicons/icons';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonCardHeader,
    IonCardTitle,
    IonCard,
    IonCol,
    IonRow,
    IonGrid,
    IonContent,
    IonHeader,
    IonTitle,
    IonButton,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonMenuButton,
    IonRouterLink,
    RouterLink,
    RouterLinkActive,
    IonItemDivider,
    IonItemGroup,
    IonLabel,
  ],
})
export class StartPage implements OnInit {
  outstandingStudents: any[] = [];
  api = inject(ApiService);

  constructor(private http: HttpClient) {
    addIcons({
      calendarOutline,
      calendarSharp,
      layersSharp,
      layersOutline,
      chatbubbleSharp,
      checkboxSharp,
    });
  }

  ngOnInit() {
    this.fetchOutstandingStudents();
  }

  fetchOutstandingStudents() {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.api.getStudents(token).subscribe((response: any) => {
        if (response && response.Students) {
          this.outstandingStudents = response.Students.filter(
            (student: { is_outstanding: boolean }) => student.is_outstanding
          ).map((student: any) => ({
            ...student,
            profile_picture_url:
              student.profile_picture_url || 'assets/default-profile.png', // Fallback image
          }));
        }
      });
    }
  }
}
