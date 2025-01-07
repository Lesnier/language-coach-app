import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
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
  IonAvatar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
  IonButton,
  IonInput,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBackOutline } from 'ionicons/icons';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
  standalone: true,
  imports: [
    IonLabel,
    IonItem,
    IonAccordionGroup,
    IonInput,
    IonAvatar,
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
    IonIcon,
    IonRow,
    IonButton,
  ],
})
export class NewPage implements OnInit {
  navCtrl = inject(NavController);
  api = inject(ApiService);
  data: any;
  ngOnInit(): void {
    console.log();
  }
  constructor() {
    addIcons({ chevronBackOutline });
  }
  selectedImage: boolean = false;
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      this.data = {
        course_id: 1,
        teacherNote: 'file.type',
        imageFile: file
      };
      console.log(this.data);
    }
  }

  crear(): void {
    const payload = {
      course_id: this.data.course_id,
      teacher_note: this.data.teacherNote,
      imageFile: this.data.imageFile,
    };
    console.log(payload);

    const token = localStorage.getItem('access_token');
    if (token)
      this.api.uploadTask(token, payload).subscribe((res) => {
        console.log(res);
      });
  }

  back() {
    this.navCtrl.back();
  }
}
