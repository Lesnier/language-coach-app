import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NavController } from '@ionic/angular';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonList,
  IonMenuButton,
  IonRouterLink,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addOutline,
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
  professors: any = {}; // Cache for professor data

  constructor() {
    addIcons({ chevronBackOutline, trashOutline, createOutline, addOutline });
  }

  ngOnInit() {
    this.getTask();
    this.getProfessors();
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

  getProfessors() {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.api.getProfessors(token).subscribe((response) => {
        if (response && response.Professors) {
          // Extract the professors array from the response
          const professors = response.Professors;
          // Convert array to lookup object for easier access
          professors.forEach((prof) => {
            this.professors[prof.id] =
              prof.name || prof.username || 'Profesor ' + prof.id;
          });
        }
      });
    }
  }

  getProfessorName(professorId: number | null): string {
    if (!professorId) return 'No asignado';
    return this.professors[professorId] || 'Profesor ' + professorId;
  }
}
