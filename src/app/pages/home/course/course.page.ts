import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonRouterLink,
  IonCardHeader,
  IonCol,
  IonCard,
  IonIcon,
  IonRow,
  IonCardTitle,
  IonGrid,
  IonAccordionGroup,
  IonAccordion,
  IonItem,
  IonLabel,
  IonButton,
  IonCardSubtitle,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { caretForwardSharp, chevronBackOutline, golfSharp, logInSharp } from 'ionicons/icons';
import { ApiService } from 'src/app/services/api.service';
import { UtilsService } from 'src/app/services/utils.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-course',
  templateUrl: './course.page.html',
  styleUrls: ['./course.page.scss'],
  standalone: true,
  imports: [
    IonCardSubtitle,
    IonCardTitle,
    IonRow,
    IonIcon,
    IonCard,
    IonCol,
    IonCardHeader,
    IonButtons,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonMenuButton,
    IonRouterLink,
    IonRouterLink,
    RouterLink,
    IonGrid,
  ],
})
export class CoursePage implements OnInit {
  api = inject(ApiService);
  utils = inject(UtilsService);
  route = inject(Router);
  navCtrl = inject(NavController);

  cursos: any[] = [];
  constructor() {
    addIcons({ caretForwardSharp, golfSharp, logInSharp ,chevronBackOutline});
  }

  ngOnInit() {
    let token = localStorage.getItem('access_token');
    if (token) {
      this.api.getCourses(token).subscribe((res) => {
        this.cursos = res;
      });
    }
  }

  goModules(id:number) {
    this.route.navigate(['/modules'], {
      queryParams: { id: id },
    });
  }

  back(){
    this.navCtrl.back();
  }
  
}
