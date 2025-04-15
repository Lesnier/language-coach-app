import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
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
export class SchedulePage implements OnInit, AfterViewInit {
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

  // Add a property to store available dates for the template
  availableDateStrings: string[] = [];

  // Add a property to store the time in API format
  timeMap: { [displayTime: string]: string } = {};

  // Add a property to store the professor_id for each date
  professorMap: { [date: string]: number } = {};

  // Create an isDateEnabled function that can be bound to the date picker
  isDateEnabled = (dateString: string): boolean => {
    // Extract just the date portion for comparison
    const formattedDateStr = dateString.split('T')[0];

    // Check if this exact date string is in our available dates array
    const isAvailable = this.availableDateStrings.includes(formattedDateStr);

    if (isAvailable) {
      console.log(`Date ${formattedDateStr} is enabled`);
    }

    return isAvailable;
  };

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

  ngAfterViewInit() {
    // Set up the date picker filter once the view is initialized
    setTimeout(() => {
      if (this.datePicker) {
        this.datePicker.isDateEnabled = (dateIsoString: string) => {
          const dateStr = dateIsoString.split('T')[0];
          return this.availableDateStrings.includes(dateStr);
        };
      }
    }, 500);
  }

  onDateChange(event: any) {
    console.log('Date changed. Raw value:', event.detail.value);

    if (!event.detail.value) return;

    // Extract the date part
    const dateString = event.detail.value.split('T')[0];

    // Check if this is an available date
    if (!this.availableDateStrings.includes(dateString)) {
      // If the selected date is not available, reset to first available date
      if (this.availableDateStrings.length > 0) {
        this.utils.showToast(
          'Fecha no disponible, selecciona otra fecha',
          'warning'
        );
        const firstDate = this.availableDateStrings[0];
        this.fechaModel = `${firstDate}T00:00:00.000Z`;
        this.updateAvailableTimes(new Date(this.fechaModel), firstDate);
      }
      return;
    }

    // Valid date selected, continue normal processing
    this.fechaModel = event.detail.value;
    const localDate = new Date(dateString + 'T12:00:00');
    this.updateAvailableTimes(localDate, dateString);
  }

  // Add dateString parameter with default value for backward compatibility
  updateAvailableTimes(date: Date, dateString?: string) {
    this.availableTimes = [];
    this.timeMap = {}; // Reset the time mapping

    // Use provided dateString if available, otherwise extract from date
    const formattedDate = dateString || date.toISOString().split('T')[0];

    console.log('Finding availability for date:', formattedDate);

    // Find availability for selected date
    const availability = this.availabilities.find((item) => {
      const availDateStr =
        typeof item.date === 'string'
          ? item.date.split('T')[0]
          : new Date(item.date).toISOString().split('T')[0];

      const matches = availDateStr === formattedDate;
      if (matches) {
        console.log('Found matching availability:', item);
      }
      return matches;
    });

    if (availability) {
      console.log(
        'Processing availability times:',
        availability.start_time,
        'to',
        availability.end_time
      );

      // Parse the ISO date-time strings to get the actual hours
      let startHour, endHour;

      if (availability.start_time.includes('T')) {
        // For ISO format dates, create proper Date objects to handle timezone correctly
        const startDate = new Date(availability.start_time);
        const endDate = new Date(availability.end_time);

        // Get local hours (browser's timezone)
        startHour = startDate.getHours();
        endHour = endDate.getHours();

        console.log(`Timezone adjusted hours: ${startHour} to ${endHour}`);
      } else {
        // Handle time-only format (HH:MM:SS)
        startHour = parseInt(availability.start_time.split(':')[0]);
        endHour = parseInt(availability.end_time.split(':')[0]);
      }

      console.log(`Final hours for display: ${startHour} to ${endHour}`);

      for (let hour = startHour; hour < endHour; hour++) {
        // Format for API (24-hour)
        const apiFormat = hour.toString().padStart(2, '0') + ':00:00';

        // Format for display (12-hour with AM/PM)
        let displayHour = hour % 12;
        displayHour = displayHour === 0 ? 12 : displayHour; // Convert 0 to 12 for 12 AM
        const period = hour < 12 ? 'AM' : 'PM';
        const displayFormat = `${displayHour}:00 ${period}`;

        // Store mapping from display format to API format
        this.timeMap[displayFormat] = apiFormat;

        this.availableTimes.push(displayFormat);
      }

      console.log('Available times generated:', this.availableTimes);
    } else {
      console.warn('No availability found for selected date:', formattedDate);
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
    const formattedDate = this.fechaModel.split('T')[0];

    // Get the time from our mapping
    const formattedTime = this.getApiTimeFormat(this.selectedTime);

    // Get the professor_id for the selected date
    const professorId = this.professorMap[formattedDate];

    if (!professorId) {
      this.utils.showToast(
        'Error: No se encontró profesor para esta fecha',
        'danger'
      );
      return;
    }

    const agendarData: agenda = {
      date: formattedDate,
      time: formattedTime,
      professor_id: professorId,
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
      this.api.daysAvailable$.subscribe((response: any) => {
        console.log('Raw API response:', response);

        // Extract availabilities from the response object
        let availabilities: Availability[] = [];
        if (response && response.availabilities) {
          availabilities = response.availabilities;
        } else if (Array.isArray(response)) {
          availabilities = response;
        }

        console.log('Extracted availabilities:', availabilities);

        if (availabilities && availabilities.length > 0) {
          // Get the dates of existing agendas (user's appointments)
          const existingAgendaDates = this.agendas
            .filter((agenda) => agenda.state === 'Active')
            .map((agenda) => agenda.date);

          console.log(
            'User already has agendas on dates:',
            existingAgendaDates
          );

          // Filter out availabilities for dates where the user already has an agenda
          const filteredAvailabilities = availabilities.filter((item) => {
            const dateStr =
              typeof item.date === 'string'
                ? item.date.split('T')[0]
                : item.date;

            // Return true only if user doesn't have agenda on this date
            const userHasAgendaOnDate = existingAgendaDates.includes(dateStr);
            if (userHasAgendaOnDate) {
              console.log(
                `Filtering out availability for ${dateStr} because user already has an agenda`
              );
            }
            return !userHasAgendaOnDate;
          });

          console.log('Filtered availabilities:', filteredAvailabilities);

          this.availabilities = filteredAvailabilities;

          // Reset arrays
          this.availableDateStrings = [];
          this.professorMap = {};

          // Process each availability item
          filteredAvailabilities.forEach((item) => {
            const dateStr =
              typeof item.date === 'string'
                ? item.date.split('T')[0]
                : item.date;

            console.log(`Processing date from API: ${item.date} => ${dateStr}`);

            // Store date string in our lookup array
            this.availableDateStrings.push(dateStr);

            // Map professor_id to this date
            this.professorMap[dateStr] = item.professor_id;
          });

          console.log('Available date strings:', this.availableDateStrings);

          // Update the date filter on the datepicker component directly
          if (this.datePicker) {
            this.datePicker.isDateEnabled = (dateIsoString: string) => {
              const dateStr = dateIsoString.split('T')[0];
              return this.availableDateStrings.includes(dateStr);
            };
          }

          // Pre-select first available date if we have any
          if (this.availableDateStrings.length > 0) {
            const firstDate = this.availableDateStrings[0];
            this.fechaModel = `${firstDate}T00:00:00.000Z`;
            this.updateAvailableTimes(new Date(this.fechaModel), firstDate);
          } else {
            this.availableTimes = [];
            this.selectedTime = '';
          }
        } else {
          console.warn('No availabilities returned from API');
          this.availableDateStrings = [];
          this.availableTimes = [];
          this.selectedTime = '';
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

  // Add this method to initialize the date filter
  setupDateFilter() {
    // Create a direct date filter function that checks against the availableDateStrings array
    this.isDateEnabled = (dateString: string): boolean => {
      // Extract just the date part (YYYY-MM-DD)
      const formattedDateStr = dateString.split('T')[0];

      // Check if this exact date string is in our available dates
      const isEnabled = this.availableDateStrings.includes(formattedDateStr);

      console.log(`Date check: ${formattedDateStr}, enabled: ${isEnabled}`);
      return isEnabled;
    };
  }
}
