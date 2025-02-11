import { Injectable } from '@angular/core';
import { Booking } from '../models/booking.model';
import { BehaviorSubject, delay, filter, map, take, tap } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private _bookings = new BehaviorSubject<Booking[]>([
    new Booking(
      'xyz',
      'place-1',
      'abc',
      'Hamburg',
      'https://www.flightgift.com/media/wp/FG/2024/03/hamburg-1024x768.jpeg',
      'Igor',
      'Igor 2',
      2,
      new Date('2025-02-04'),
      new Date('2025-02-07')
    ),
    new Booking(
      'xyz-1',
      'place-2',
      'abc',
      'Kyiv',
      'https://content.r9cdn.net/rimg/dimg/27/bb/1e63bfbb-city-15139-1645cdf896a.jpg?width=1366&height=768&xhint=2663&yhint=911&crop=true',
      'Igor',
      'Igor 2',
      2,
      new Date('2025-02-04'),
      new Date('2025-02-07')
    ),
    new Booking(
      'xyz-2',
      'place-3',
      'abc',
      'Tokyo',
      'https://www.advantour.com/img/japan/images/tokyo.jpg',
      'Igor',
      'Igor 2',
      2,
      new Date('2025-02-04'),
      new Date('2025-02-07')
    ),
  ]);

  constructor(private authService: AuthService) {}

  get bookings() {
    return this._bookings.asObservable();
  }

  addBooking(
    placeId: string,
    placeTitle: string,
    placeImage: string,
    firstName: string,
    lastName: string,
    guestNumber: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    const authIdFromService = this.authService.userID;
    const newBooking = new Booking(
      Math.random().toString(),
      placeId,
      authIdFromService,
      placeTitle,
      placeImage,
      firstName,
      lastName,
      guestNumber,
      dateFrom,
      dateTo
    );

    return this._bookings.pipe(
      take(1),
      delay(1000),
      tap((bookings) => this._bookings.next(bookings.concat(newBooking)))
    );
  }

  cancelBooking(id: string) {
    return this._bookings.pipe(
      take(1),
      delay(1000),
      tap((bookings) => {
        this._bookings.next(bookings.filter((booking) => booking._id !== id));
      })
    );
  }
}
