import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router} from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonCardHeader,
  IonCol,
  IonCard,
  IonIcon,
  IonRow,
  IonCardTitle,
  IonGrid,
  IonButton,

} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { caretForwardSharp, chevronBackOutline, golfSharp, logInSharp } from 'ionicons/icons';
import { ApiService } from 'src/app/services/api.service';
import { NavController } from '@ionic/angular';
import { cursos } from 'src/app/models/interfaces';
@Component({
  selector: 'app-course',
  templateUrl: './course.page.html',
  styleUrls: ['./course.page.scss'],
  standalone: true,
  imports: [
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
    IonGrid,
  ],
})
export class CoursePage implements OnInit {
  api = inject(ApiService);
  route = inject(Router);
  navCtrl = inject(NavController);

  cursos: cursos[] = [];
  constructor() {
    addIcons({ caretForwardSharp, golfSharp, logInSharp ,chevronBackOutline});
  }

  ngOnInit() {
    let token = localStorage.getItem('access_token');
    if (token) {
      this.api.getCourses(token).subscribe((res) => {
        this.cursos = res;
        console.log(this.cursos)
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
