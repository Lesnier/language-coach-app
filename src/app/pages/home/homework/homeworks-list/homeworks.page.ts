import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonRouterLink,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
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
    IonLabel,
    IonItem,
    IonAccordionGroup,
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

    const token = localStorage.getItem('access_token');
    if (token)
      this.api.getTask(token).subscribe((res) => {
        this.tasks = res;        
      });
  }

  back() {
    this.navCtrl.back();
  }

  goTask(id: number) {
    this.router.navigate(['/homework'], {
      queryParams: { id: id },
    });
  }

  editTask() {}

  deleteTask() {}
}
