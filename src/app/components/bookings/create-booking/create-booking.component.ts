import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Place } from '../../places/models/places.model';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
  standalone: false,
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace!: Place;
  @Input() selectedMode!: 'select' | 'random';
  @ViewChild('f', { static: true }) form!: NgForm;
  startDate!: string;
  endDate!: string;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.initDate();
  }

  initDate() {
    const availableFromTime = new Date(
      this.selectedPlace.availableFrom
    ).getTime();
    const availableToTime = new Date(this.selectedPlace.availableTo).getTime();

    if (availableFromTime >= availableToTime) {
      console.warn(
        'Invalid date range: availableFrom is later than availableTo'
      );
      return;
    }

    switch (this.selectedMode) {
      case 'select':
        break;

      case 'random':
        this.startDate = new Date(
          this.randomTimeBetween(
            availableFromTime,
            availableToTime - 7 * 24 * 60 * 60 * 1000
          )
        ).toISOString();

        const startTime = new Date(this.startDate).getTime();
        this.endDate = new Date(
          this.randomTimeBetween(startTime, startTime + 6 * 24 * 60 * 60 * 1000)
        ).toISOString();
        break;
    }
  }

  /**
   * Generates a random timestamp between two values
   */
  private randomTimeBetween(from: number, to: number): number {
    return from + Math.random() * (to - from);
  }

  onBookPlace() {
    if (!this.form.valid || !this.dateValid()) return;
    this.modalCtrl.dismiss(
      {
        bookingData: {
          firstName: this.form.value['first-name'],
          lastName: this.form.value['last-name'],
          guestNumber: +this.form.value['guest-number'],
          startDate: new Date(this.form.value['date-from']),
          endDate: new Date(this.form.value['date-to']),
        },
      },
      'confirm'
    );
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  dateValid() {
    const startDate = new Date(this.form.value['date-from']),
      endDate = new Date(this.form.value['date-to']);

    return endDate > startDate;
  }
}
