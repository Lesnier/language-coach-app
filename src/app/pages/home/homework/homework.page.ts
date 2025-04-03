import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { ApiService } from 'src/app/services/api.service';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-homework',
  templateUrl: './homework.page.html',
  styleUrls: ['./homework.page.scss'],
  standalone: true,
  imports: [
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonItem,
    IonButton,
  ],
})
export class HomeworkPage implements OnInit {
  api = inject(ApiService);
  route = inject(ActivatedRoute);
  apiUrl = environment.apiUrl;
  task: any;
  id: string | null = null;
  constructor() {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((result) => {
      this.id = result.get('id');
    });

    const token = localStorage.getItem('access_token');
    if (token) this.getTask(token);
  }

  getTask(token: string) {
    this.api.getTask(token).subscribe((res) => {
      res.forEach((element: any) => {
        if (element.id == this.id) {
          this.task = element;
          this.task.image = element.image_url; // Use the image_url property directly
        }
      });
    });
  }
}
