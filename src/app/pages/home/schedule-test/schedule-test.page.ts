import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonDatetime,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonNote,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  calendarOutline,
  chevronBackOutline,
  timeOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-schedule-test',
  templateUrl: './schedule-test.page.html',
  styleUrls: ['./schedule-test.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonMenuButton,
    IonItem,
    IonLabel,
    IonDatetime,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonCardSubtitle,
    IonIcon,
    IonList,
    IonNote,
  ],
})
export class ScheduleTestPage implements OnInit {
  meetingForm: FormGroup;
  disabledDates: Date[] = [];
  minDate: string;
  selectedDate: Date | null = null;

  // Available time slots from 8 AM to 5 PM
  timeSlots: {
    hour: number;
    minute: number;
    available: boolean;
    label: string;
  }[] = [];
  selectedTimeSlot: string | null = null;

  constructor(private fb: FormBuilder) {
    this.meetingForm = this.fb.group({
      date: [null],
    });
    this.minDate = new Date().toISOString();
    addIcons({ calendarOutline, chevronBackOutline, timeOutline });
  }

  ngOnInit() {
    this.setDisabledDates();
    this.generateTimeSlots();
  }

  setDisabledDates() {
    // Hardcoded disabled dates for testing
    this.disabledDates = [
      new Date('2023-10-15'),
      new Date('2023-10-20'),
      new Date('2023-10-25'),
    ];
  }

  generateTimeSlots() {
    // Generate time slots from 8 AM to 5 PM in 1-hour intervals
    this.timeSlots = [];
    for (let hour = 8; hour <= 17; hour++) {
      const displayHour = hour > 12 ? hour - 12 : hour;
      const amPm = hour >= 12 ? 'PM' : 'AM';

      this.timeSlots.push({
        hour: hour,
        minute: 0,
        available: true, // Default all to available
        label: `${displayHour}:00 ${amPm}`,
      });
    }
  }

  // Update availability based on the selected date
  updateAvailability() {
    if (!this.selectedDate) return;

    // Reset availability
    this.timeSlots.forEach((slot) => (slot.available = true));

    // For demonstration, let's disable some slots
    // In a real app, this would come from an API or service
    const dayOfWeek = this.selectedDate.getDay();

    // Disable specific slots based on day of week
    // (For example, no early morning slots on Mondays)
    if (dayOfWeek === 1) {
      // Monday
      this.timeSlots[0].available = false; // 8 AM
      this.timeSlots[1].available = false; // 9 AM
    }

    // Disable lunch hour for all days
    this.timeSlots[4].available = false; // 12 PM

    // Disable late afternoon on Fridays
    if (dayOfWeek === 5) {
      // Friday
      this.timeSlots[8].available = false; // 4 PM
      this.timeSlots[9].available = false; // 5 PM
    }
  }

  getDateValue(): string | null {
    return this.meetingForm.get('date')?.value || null;
  }

  isDateFormControlEmpty(): boolean {
    return !this.getDateValue();
  }

  isDateDisabled(date: string | null): boolean {
    if (!date) return true;

    const selectedDate = new Date(date);
    return (
      selectedDate < new Date(this.minDate) ||
      this.disabledDates.some((disabledDate) =>
        this.isSameDay(disabledDate, selectedDate)
      )
    );
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  onDateChange(event: any) {
    const dateString = event.detail.value;
    this.selectedDate = dateString ? new Date(dateString) : null;
    this.selectedTimeSlot = null; // Reset selected time when date changes

    // Update time slot availability based on selected date
    this.updateAvailability();
  }

  selectTimeSlot(timeSlot: any) {
    if (!timeSlot.available) return;
    this.selectedTimeSlot = timeSlot.label;
  }

  submit() {
    if (this.selectedDate && this.selectedTimeSlot) {
      const formattedDate = this.selectedDate.toISOString().split('T')[0];
      console.log('Meeting scheduled:', {
        date: formattedDate,
        timeSlot: this.selectedTimeSlot,
      });
      // Here you would handle the submission
    }
  }
}
