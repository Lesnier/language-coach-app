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
import {
  calendarOutline,
  chevronBackOutline,
  refreshOutline,
  trashOutline,
} from 'ionicons/icons';
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
    addIcons({
      calendarOutline,
      chevronBackOutline,
      refreshOutline,
      trashOutline,
    });
  }

  ngOnInit() {
    this.fechaModel = new Date().toISOString();
    this.getAgendas();
    this.getAvailabilities();
  }

  onDateChange(event: any) {
    console.log('Raw date change value:', event.detail.value);

    // Store the raw selected date string (including the T part)
    this.fechaModel = event.detail.value;

    // Fix timezone issues by working with the date string directly
    const dateString = event.detail.value.split('T')[0];
    console.log('Extracted date string:', dateString);

    // Create a date that preserves the selected date
    const localDate = new Date(dateString + 'T12:00:00');
    console.log('Created local date object:', localDate);

    this.updateAvailableTimes(localDate, dateString);
  }

  // Add dateString parameter with default value for backward compatibility
  updateAvailableTimes(date: Date, dateString?: string) {
    this.availableTimes = [];
    this.timeMap = {}; // Reset the time mapping

    // Use provided dateString if available, otherwise extract from date
    const formattedDate = dateString || date.toISOString().split('T')[0];

    // Find availability for selected date using strict string comparison
    const availability = this.availabilities.find((item) => {
      const availDateStr =
        typeof item.day_of_week === 'string'
          ? item.day_of_week.split('T')[0]
          : new Date(item.day_of_week).toISOString().split('T')[0];

      return availDateStr === formattedDate;
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

    const token = localStorage.getItem('access_token');

    // Extract date directly from the string without creating a Date object
    // This avoids timezone shifts
    const formattedDate = this.fechaModel.split('T')[0];

    // Log the date for verification
    console.log('Selected date (raw):', this.fechaModel);
    console.log('Formatted date for API:', formattedDate);

    // Convert from display format to API format
    const formattedTime = this.getApiTimeFormat(this.selectedTime);

    const agendarData: agenda = {
      date: formattedDate,
      time: formattedTime,
    };

    console.log('Sending to API:', agendarData);

    if (token) {
      this.isLoading = true;
      this.utils.showLoading('Agendando tu cita...').then(() => {
        this.api.postAgenda(agendarData, token).subscribe(
          (res: any) => {
            this.utils.dismissLoading();
            this.isLoading = false;

            // Check if the response contains an error message despite 200 status
            if (res.error) {
              console.warn('API returned error:', res.error);
              this.createdDate = false;
              this.invalidDate = true;

              // Display the error message to the user
              this.utils.showToast(
                res.error === 'The user have an agenda in the selected date'
                  ? 'Ya tienes una cita agendada para esta fecha'
                  : res.error,
                'warning'
              );
            } else {
              // Success case - no errors
              this.createdDate = true;
              this.invalidDate = false;
              this.utils.showToast('Cita agendada con éxito', 'success');

              // Reset selection
              this.selectedTime = '';

              // Refresh agendas once
              this.fetchAgendas(true);
            }
          },
          (error) => {
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

  // Add a new method that explicitly fetches and refreshes agendas
  fetchAgendas(forceRefresh = false) {
    let token = localStorage.getItem('access_token');
    if (token) {
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
        console.log('Raw availabilities from API:', availabilities);

        if (availabilities && availabilities.length > 0) {
          // Normalize dates to ensure consistent format
          this.availabilities = availabilities.map((item) => {
            // Ensure day_of_week is consistently formatted
            if (typeof item.day_of_week === 'string') {
              item.day_of_week = item.day_of_week.split('T')[0]; // Keep only YYYY-MM-DD part
            }
            return item;
          });

          console.log('Normalized availabilities:', this.availabilities);

          // Create lookup array of just the date strings
          const availableDateStrings = this.availabilities.map((item) =>
            typeof item.day_of_week === 'string'
              ? item.day_of_week
              : new Date(item.day_of_week).toISOString().split('T')[0]
          );

          console.log('Available dates for lookup:', availableDateStrings);

          // Set up date picker with normalized date handling
          if (this.datePicker) {
            this.datePicker.isDateEnabled = (dateString: string) => {
              const date = new Date(dateString);
              // Disable past dates
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              if (date < today) return false;

              // Use the date string directly to avoid timezone issues
              const formattedDateStr = dateString.split('T')[0];
              const isEnabled = availableDateStrings.includes(formattedDateStr);

              if (isEnabled) {
                console.log(`Date ${formattedDateStr} is enabled`);
              }
              return isEnabled;
            };
          }

          // Update for initial date - carefully handle initial date string
          const initialDate = new Date(this.fechaModel);
          const initialDateStr = this.fechaModel.split('T')[0];
          this.updateAvailableTimes(initialDate, initialDateStr);
        } else {
          console.warn('No availabilities returned from API');
        }
      });
    }
  }

  back() {
    this.navCtrl.back();
  }

  // Add method to delete an agenda
  deleteAgenda(agendaId: number) {
    // Confirm before deleting
    this.utils.showConfirm(
      'Cancelar cita',
      '¿Estás seguro que deseas cancelar esta cita?',
      [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.performAgendaDeletion(agendaId);
          },
        },
      ]
    );
  }

  // Separate method to perform the actual deletion after confirmation
  private performAgendaDeletion(agendaId: number) {
    const token = localStorage.getItem('access_token');

    if (!token) {
      this.utils.showToast(
        'No se pudo autenticar. Inicia sesión nuevamente.',
        'danger'
      );
      return;
    }

    this.isLoading = true;
    this.utils.showLoading('Cancelando cita...').then(() => {
      this.api.deleteAgenda(agendaId, token).subscribe(
        (res: any) => {
          this.utils.dismissLoading();
          this.isLoading = false;

          // Check if response contains an error
          if (res && res.error) {
            this.utils.showToast(res.error, 'danger');
            return;
          }

          // Success case
          this.utils.showToast('Cita cancelada con éxito', 'success');

          // Refresh the agendas list
          this.fetchAgendas(true);
        },
        (error: { error: { message: string } }) => {
          this.utils.dismissLoading();
          this.isLoading = false;

          // Handle error response
          const errorMessage =
            error.error?.message || 'Error al cancelar la cita';
          this.utils.showToast(errorMessage, 'danger');
        }
      );
    });
  }

  allowedRanges = [
    { start: new Date(2025, 1, 18), end: new Date(2025, 1, 20) },
    { start: new Date(2025, 2, 19), end: new Date(2025, 2, 20) },
  ];

  availableDays = [
    { date: new Date(2025, 1, 18) },
    { date: new Date(2025, 1, 19) },
  ];
}
