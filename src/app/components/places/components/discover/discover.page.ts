import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { Place } from '../../models/places.model';
import { SegmentChangeEventDetail } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/components/auth/auth.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
  standalone: false,
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedPlacesFromService: Place[] = [];
  relevantPlaces: Place[] = [];
  listedLoadedPlaces: Place[] = [];
  subscriptionPlaces!: Subscription;

  constructor(
    private placesService: PlacesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadPlacesFromService();
  }

  loadPlacesFromService() {
    this.subscriptionPlaces = this.placesService.places.subscribe((places) => {
      this.loadedPlacesFromService = places;
      this.relevantPlaces = this.loadedPlacesFromService;
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    });
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    const { value } = event.detail;
    const userIdFromAuthService = this.authService.userID;

    if (value === 'all') {
      this.relevantPlaces = this.loadedPlacesFromService;
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    }

    if (value === 'bookable') {
      this.relevantPlaces = this.loadedPlacesFromService.filter(
        (place) => place.userId !== userIdFromAuthService
      );
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    }
  }

  ngOnDestroy() {
    if (this.subscriptionPlaces) this.subscriptionPlaces.unsubscribe();
  }
}
