import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonDatetime,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonMenuButton,
  IonNote,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { calendarOutline, chevronBackOutline } from 'ionicons/icons';
import { agenda, agendas, Availability } from 'src/app/models/interfaces';
import { ApiService } from 'src/app/services/api.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
  standalone: true,
  imports: [
    IonNote,
    IonList,
    IonLabel,
    IonButton,
    IonGrid,
    IonCol,
    IonIcon,
    IonCard,
    IonRow,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonDatetime,
    IonMenuButton,
    IonItem,
    IonBadge,
    IonItemGroup,
    IonItemDivider,
    IonSelect,
    IonSelectOption,
    IonSpinner,
  ],
})
export class SchedulePage implements OnInit {
  api = inject(ApiService);
  http = inject(HttpClient);
  navCtrl = inject(NavController);
  utils = inject(UtilsService);
  @ViewChild(IonDatetime, { static: false }) datePicker!: IonDatetime;
  availabilities: Availability[] = [];

  invalidDate: boolean = false;
  createdDate: boolean = false;

  fechaModel: string = '';
  fechaActual: Date;

  agendas: agendas[] = [];
  availableTimes: string[] = [];
  selectedTime: string = '';
  highlightedDates: any[] = [];
  isLoading: boolean = false;

  // Add a property to store the time in API format
  timeMap: { [displayTime: string]: string } = {};

  constructor() {
    this.fechaActual = new Date();
    addIcons({ calendarOutline, chevronBackOutline });
  }

  ngOnInit() {
    this.fechaModel = new Date().toISOString();
    this.getAgendas();
    this.getAvailabilities();
  }

  onDateChange(event: any) {
    const selectedDate = new Date(event.detail.value);
    this.updateAvailableTimes(selectedDate);
  }

  updateAvailableTimes(date: Date) {
    this.availableTimes = [];
    this.timeMap = {}; // Reset the time mapping
    const formattedDate = date.toISOString().split('T')[0];

    // Find availability for selected date
    const availability = this.availabilities.find((item) => {
      const availDate = new Date(item.day_of_week);
      return availDate.toISOString().split('T')[0] === formattedDate;
    });

    if (availability) {
      const startHour = parseInt(availability.start_time.split(':')[0]);
      const endHour = parseInt(availability.end_time.split(':')[0]);

      for (let hour = startHour; hour < endHour; hour++) {
        // Format for API (24-hour)
        const apiFormat = hour.toString().padStart(2, '0') + ':00';

        // Format for display (12-hour with AM/PM)
        let displayHour = hour % 12;
        displayHour = displayHour === 0 ? 12 : displayHour; // Convert 0 to 12 for 12 AM
        const period = hour < 12 ? 'AM' : 'PM';
        const displayFormat = `${displayHour}:00 ${period}`;

        // Store mapping from display format to API format
        this.timeMap[displayFormat] = apiFormat;

        this.availableTimes.push(displayFormat);
      }
    }

    this.selectedTime =
      this.availableTimes.length > 0 ? this.availableTimes[0] : '';
  }

  // Convert from display format to API format when scheduling
  getApiTimeFormat(displayTime: string): string {
    return this.timeMap[displayTime] || displayTime;
  }

  agendar() {
    if (!this.selectedTime) {
      this.createdDate = false;
      this.invalidDate = true;
      this.utils.showToast('Por favor selecciona un horario', 'danger');
      return;
    }

    const selectedDate = new Date(this.fechaModel);
    const token = localStorage.getItem('access_token');

    // Format date strictly to YYYY-MM-DD
    const formattedDate = selectedDate.toISOString().split('T')[0];

    // Convert from display format to API format
    const formattedTime = this.getApiTimeFormat(this.selectedTime);

    console.log(
      `Scheduling appointment for date: ${formattedDate}, time: ${formattedTime} (display: ${this.selectedTime})`
    );

    const agendarData: agenda = {
      date: formattedDate,
      time: formattedTime,
    };

    if (token) {
      this.isLoading = true;
      this.utils.showLoading('Agendando tu cita...').then(() => {
        console.log('Sending agenda data:', agendarData);

        this.api.postAgenda(agendarData, token).subscribe(
          (res) => {
            console.log('Agenda creation response:', res);
            this.utils.dismissLoading();
            this.isLoading = false;
            this.createdDate = true;
            this.invalidDate = false;
            this.utils.showToast('Cita agendada con éxito', 'success');

            // Reset selection
            this.selectedTime = '';

            // Force refresh with multiple attempts
            this.refreshAgendasWithRetry();
          },
          (error) => {
            console.error('Agenda creation error:', error);
            this.utils.dismissLoading();
            this.isLoading = false;
            this.createdDate = false;
            this.invalidDate = true;
            this.utils.showToast(
              error.error?.message || 'Error al agendar la cita',
              'danger'
            );
          }
        );
      });
    }
  }

  // New method to refresh agendas with retry logic
  refreshAgendasWithRetry(attempts = 3, delay = 500) {
    console.log(`Refreshing agendas (attempts left: ${attempts})`);

    // First attempt
    this.fetchAgendas(true);

    // Set up retries with increasing delays
    if (attempts > 1) {
      for (let i = 1; i < attempts; i++) {
        setTimeout(() => {
          console.log(`Retry attempt ${i} for fetching agendas`);
          this.fetchAgendas(true);
        }, delay * i);
      }
    }
  }

  // Add a new method that explicitly fetches and refreshes agendas
  fetchAgendas(forceRefresh = false) {
    let token = localStorage.getItem('access_token');
    if (token) {
      console.log('Fetching agendas...');
      this.api.getAgendas(token).subscribe(
        (res) => {
          console.log('Fetched agendas:', res);
          if (res && res.agendas) {
            const newAgendas = [...res.agendas];
            console.log(`Found ${newAgendas.length} agendas`);

            // Check if there are actual changes before updating
            const changed =
              forceRefresh ||
              this.agendas.length !== newAgendas.length ||
              JSON.stringify(this.agendas) !== JSON.stringify(newAgendas);

            if (changed) {
              console.log('Updating agendas list with new data');
              this.agendas = newAgendas;
              this.updateHighlightedDates();
            } else {
              console.log('No changes in agendas data');
            }
          } else {
            console.warn('Received empty or invalid agendas response:', res);
          }
        },
        (err) => {
          console.error('Error fetching agendas:', err);
          this.utils.showToast('Error al obtener agendamientos', 'danger');
        }
      );
    }
  }

  getAgendas() {
    let token = localStorage.getItem('access_token');
    if (token) {
      this.api.getAgendas(token).subscribe((res) => {
        this.agendas = res.agendas;
        this.updateHighlightedDates();
      });
    }
  }

  updateHighlightedDates() {
    this.highlightedDates = this.agendas.map((agenda) => {
      return {
        date: agenda.date,
        textColor: '#ffffff', // White text for better contrast
        backgroundColor: 'var(--ion-color-green, #2dd36f)', // Use Ionic green or fallback
        fontWeight: 'bold',
        // Add a CSS class for additional styling
        cssClass: 'user-scheduled-date',
      };
    });
  }

  getAvailabilities() {
    let token = localStorage.getItem('access_token');
    if (token) {
      this.api.getAvailabilities(token);
      this.api.daysAvailable$.subscribe((availabilities: Availability[]) => {
        console.log('disponibilidades', availabilities);
        if (availabilities) {
          this.availabilities = availabilities;
          if (this.datePicker) {
            this.datePicker.isDateEnabled = (dateString: string) =>
              this.isDateEnabled(dateString);
          }
          // Update times for initial date
          this.updateAvailableTimes(new Date(this.fechaModel));
        }
      });
    }
  }

  back() {
    this.navCtrl.back();
  }

  allowedRanges = [
    { start: new Date(2025, 1, 18), end: new Date(2025, 1, 20) },
    { start: new Date(2025, 2, 19), end: new Date(2025, 2, 20) },
  ];

  availableDays = [
    { date: new Date(2025, 1, 18) },
    { date: new Date(2025, 1, 19) },
  ];

  isDateEnabled = (dateString: string): boolean => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Disable past dates
    if (date < today) {
      return false;
    }

    // Check if date is in availabilities
    return this.availabilities.some((item) => {
      date.setHours(0, 0, 0, 0);
      let availableDay = new Date(item.day_of_week);
      availableDay.setHours(0, 0, 0, 0);
      return date.getTime() === availableDay.getTime();
    });
  };
}
