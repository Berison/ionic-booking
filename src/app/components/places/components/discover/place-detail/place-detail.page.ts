import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ActionSheetController,
  LoadingController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { PlacesService } from '../../../services/places.service';
import { Place } from '../../../models/places.model';
import { CreateBookingComponent } from 'src/app/components/bookings/create-booking/create-booking.component';
import { filter, Subscription } from 'rxjs';
import { BookingService } from 'src/app/components/bookings/services/booking.service';
import { AuthService } from 'src/app/components/auth/auth.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
  standalone: false,
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  place!: Partial<Place>;
  isBookable = false;
  subscriptionPlace!: Subscription;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private bookingService: BookingService,
    private loadingCtrl: LoadingController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/discover');
        return;
      }

      this.subscriptionPlace = this.placesService
        .getPlaceById(paramMap.get('placeId') || '')
        .pipe(filter((data) => !!data))
        .subscribe((place) => {
          this.place = place;
          this.isBookable = place.userId !== this.authService.userID;
        });
    });
  }

  onBookPlace() {
    this.actionSheetCtrl
      .create({
        header: 'Choose an Action',
        buttons: [
          {
            text: 'Select Date',
            handler: () => {
              this.openBookingModal('select');
            },
          },
          {
            text: 'Random Date',
            handler: () => {
              this.openBookingModal('random');
            },
          },
          {
            text: 'Cancel',
            role: 'cancel',
          },
        ],
      })
      .then((actionSheetEl) => {
        actionSheetEl.present();
      });
  }

  openBookingModal(mode: 'select' | 'random') {
    this.modalCtrl
      .create({
        component: CreateBookingComponent,
        componentProps: { selectedPlace: this.place, selectedMode: mode },
      })
      .then((modalEl) => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then((resultData) => {
        if (resultData.role === 'confirm') {
          this.loadingCtrl
            .create({
              message: 'Booking place...',
            })
            .then((loadingEl) => {
              loadingEl.present();
              const { firstName, lastName, guestNumber, startDate, endDate } =
                resultData.data.bookingData;
              const { _id, title, imageUrl } = this.place;

              if (!!_id && !!title && !!imageUrl) {
                this.bookingService
                  .addBooking(
                    _id,
                    title,
                    imageUrl,
                    firstName,
                    lastName,
                    guestNumber,
                    startDate,
                    endDate
                  )
                  .subscribe(() => {
                    loadingEl.dismiss();
                  });
              } else return;
            });
        }
      });
  }

  ngOnDestroy() {
    if (this.subscriptionPlace) this.subscriptionPlace.unsubscribe();
  }
}
