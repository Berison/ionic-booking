import { Injectable } from '@angular/core';
import { Booking } from '../models/booking.model';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private _bookings: Booking[] = [
    new Booking('xyz', 'place-1', 'user-1', 'Hamburg', '+38014212312'),
    new Booking('xyz-1', 'place-2', 'user-2', 'Kyiv', '+38014421241'),
    new Booking('xyz-2', 'place-3', 'user-1', 'Tokyo', '+38014412122'),
  ];

  get bookings() {
    return [...this._bookings];
  }
}
