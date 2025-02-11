import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { filter, Subscription } from 'rxjs';
import { Place } from 'src/app/components/places/models/places.model';
import { PlacesService } from 'src/app/components/places/services/places.service';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
  standalone: false,
})
export class OfferBookingsPage implements OnInit, OnDestroy {
  place!: Partial<Place>;
  subscriptionPlace!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private placesService: PlacesService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/offers');
        return;
      }

      this.subscriptionPlace = this.placesService
        .getPlaceById(paramMap.get('placeId') || '')
        .pipe(filter((data) => !!data))
        .subscribe((place) => {
          this.place = place;
        });
    });
  }

  ngOnDestroy() {
    if (this.subscriptionPlace) this.subscriptionPlace.unsubscribe();
  }
}
