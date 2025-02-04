import { Component, OnInit } from '@angular/core';
import { BookingService } from './services/booking.service';
import { Booking } from './models/booking.model';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
  standalone: false,
})
export class BookingsPage implements OnInit {
  loadedBookings: Booking[] = [];
  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.loadBookingsFromService();
  }

  ionViewWillEnter() {
    this.loadBookingsFromService();
  }

  loadBookingsFromService() {
    this.loadedBookings = this.bookingService.bookings;
  }

  onDeleteBooking(id: string, slidingBooking: IonItemSliding) {
    slidingBooking.close();
    this.loadedBookings = this.loadedBookings.filter(
      (booking) => booking._id !== id
    );
  }
}
