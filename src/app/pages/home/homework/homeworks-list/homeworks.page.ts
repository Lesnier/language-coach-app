import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { NavController, ViewWillEnter } from '@ionic/angular';
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
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
import { environment } from 'src/environments/environment';

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
    RouterLink,
    RouterLinkActive,
    IonIcon,
    IonRow,
    IonButton,
    IonItem,
    IonAvatar,
    IonLabel,
  ],
})
export class HomeworksPage implements OnInit, ViewWillEnter {
  activeRoute = inject(ActivatedRoute);
  navCtrl = inject(NavController);
  api = inject(ApiService);
  router = inject(Router);
  tasks: any[] = [];
  professors: any = {}; // Cache for professor data
  baseUrl: string = environment.apiUrl; // Use the apiUrl from the environment

  constructor() {
    addIcons({ chevronBackOutline, trashOutline, createOutline, addOutline });
  }

  ngOnInit() {
    this.getTasks();
    this.getProfessors();
  }

  ionViewWillEnter() {
    this.getTasks(); // Fetch updated tasks when the page is entered
  }

  back() {
    this.router.navigate(['/start']);
  }

  goTask(id: number) {
    this.router.navigate(['/homework'], {
      queryParams: { id: id },
    });
  }

  deleteTask(id: number) {
    const token = localStorage.getItem('access_token');
    if (token)
      this.api.deleteTask(token, id).subscribe(() => {
        this.getTasks();
      });
  }

  getTasks() {
    const token = localStorage.getItem('access_token');
    if (token)
      this.api.getTask(token).subscribe((res) => {
        // Return the response

        // Clear the tasks array before populating it
        this.tasks = []; // Clear the array to avoid duplicates
        // Populate the tasks array with the response data
        this.tasks = res; // Assign the response to the tasks array
        console.log(this.tasks);
      });
  }

  getProfessors() {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.api.getProfessors(token).subscribe((response) => {
        if (response && response.Professors) {
          const professors = response.Professors;
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
