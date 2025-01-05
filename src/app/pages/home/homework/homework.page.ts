import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
} from '@ionic/angular/standalone';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-homework',
  templateUrl: './homework.page.html',
  styleUrls: ['./homework.page.scss'],
  standalone: true,
  imports: [
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
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
  ],
})
export class HomeworkPage implements OnInit {
  api = inject(ApiService);
  route = inject(ActivatedRoute);
  private apiUrl = 'https://language-coach-back.lesinnovations.tech/storage/files/';
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
          this.task.image = this.apiUrl + element.image;
        }
      });
    });
  }
}
