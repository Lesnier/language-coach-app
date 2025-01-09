import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NavController } from '@ionic/angular';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonRouterLink,
  IonCard,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
  IonButton,
  IonList,
  IonCardContent,
  IonText,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  chevronBackOutline,
  createOutline,
  trashOutline,
} from 'ionicons/icons';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-homeworks-list',
  templateUrl: './homeworks.page.html',
  styleUrls: ['./homeworks.page.scss'],
  standalone: true,
  imports: [
    IonText,
    IonCardContent,
    IonList,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonMenuButton,
    IonCard,
    IonCol,
    IonGrid,
    IonRouterLink,
    IonRouterLink,
    RouterLink,
    RouterLinkActive,
    IonIcon,
    IonRow,
    IonButton,
  ],
})
export class HomeworksPage implements OnInit {
  navCtrl = inject(NavController);
  api = inject(ApiService);
  router = inject(Router);
  tasks: any[] = [];
  constructor() {
    addIcons({ chevronBackOutline, trashOutline, createOutline });
  }

  ngOnInit() {
    this.getTask();
  }

  back() {
    this.navCtrl.back();
  }

  goTask(id: number) {
    this.router.navigate(['/homework'], {
      queryParams: { id: id },
    });
  }

  deleteTask(id: number) {
    const token = localStorage.getItem('access_token');
    if (token)
      this.api.deleteTask(token, id).subscribe((res) => {
        this.getTask();
      });
  }

  getTask() {
    const token = localStorage.getItem('access_token');
    if (token)
      this.api.getTask(token).subscribe((res) => {
        this.tasks = res;
        console.log(this.tasks);
        
      });
  }
}
