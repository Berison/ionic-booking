import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookingService } from './services/booking.service';
import { Booking } from './models/booking.model';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
  standalone: false,
})
export class BookingsPage implements OnInit, OnDestroy {
  loadedBookings: Booking[] = [];
  subscriptionBooking!: Subscription;

  constructor(
    private bookingService: BookingService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.loadBookingsFromService();
  }

  loadBookingsFromService() {
    this.subscriptionBooking = this.bookingService.bookings.subscribe(
      (bookingPlaces) => {
        this.loadedBookings = bookingPlaces;
      }
    );
  }

  onDeleteBooking(id: string, slidingBooking: IonItemSliding) {
    slidingBooking.close();
    this.loadingCtrl
      .create({
        message: 'Canceling...',
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.bookingService.cancelBooking(id).subscribe(() => {
          loadingEl.dismiss();
        });
      });
  }

  ngOnDestroy() {
    if (this.subscriptionBooking) this.subscriptionBooking.unsubscribe();
  }
}
