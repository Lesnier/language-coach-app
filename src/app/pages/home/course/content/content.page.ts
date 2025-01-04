import {
  Component,
  DoCheck,
  inject,
  Input,
  OnInit,
  Sanitizer,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonMenuButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Lesson, models } from 'src/app/models/interfaces';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { chevronBackOutline } from 'ionicons/icons';
@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButton,
    IonButtons,
    IonMenuButton,
    IonIcon,
  ],
})
export class ContentPage implements OnInit, DoCheck {
  route = inject(ActivatedRoute);
  router = inject(Router);
  api = inject(ApiService);
  sanitizer = inject(DomSanitizer);
  navCtrl = inject(NavController);

  id: any;
  idM: any;
  idL: any;

  rawContent: string = '';
  class_content: SafeHtml = '';
  lesson_name: string = '';
  lesson_file:number = 0;
  constructor() {
    
    addIcons({ chevronBackOutline });
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((result) => {
      this.id = result.get('id');
      this.idM = result.get('idM');
      this.idL = result.get('idL');
    });

    const token = localStorage.getItem('access_token');

    if (token)
      this.api.getCourse(token, this.id).subscribe((res) => {
        res.modules.forEach((element: models) => {
          if (element.id == this.idM) {
            element.lessons.forEach((les: Lesson) => {
              if (les.id == this.idL) {
                console.log(les);

                this.rawContent = les.class_content;
                this.lesson_name = les.name;
              }
            });
          }
        });
      });
    if (token)
      this.api.getFiles(token,4).subscribe((res) => {
    res.forEach((element:any) => {
      if(element.id == 4){
        this.lesson_file = element.file;
      }
    });
  
      });
  }

  ngDoCheck(): void {
    const processedContent = this.processContent(this.rawContent);

    this.class_content =
      this.sanitizer.bypassSecurityTrustHtml(processedContent);
  }

  private processContent(content: string): string {
    content = content.replace(/\r\n/g, '<br>').replace(/\n/g, '<br>');

    content = content.replace(/(.+?)(\n\n|$)/g, '<p>$1</p>');

    const listItems = content.match(/(?:^|\n)- (.+?)(?=\n|$)/g);

    if (listItems) {
      // Si hay elementos de lista, los envolvemos en <ul>
      const listHtml = listItems
        .map((item) => `<li>${item.replace(/^- /, '')}</li>`)
        .join('');
      content = content.replace(/(?:^|\n)- .+?(?=\n|$)/g, '');
      content += `<ul>${listHtml}</ul>`;
    }

    content = content.replace(/<p><\/p>/g, '');

    return content.trim();
  }

  back() {
    this.navCtrl.back();
  }
}
