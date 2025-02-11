import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { Place } from '../../models/places.model';
import { IonItemSliding, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
  standalone: false,
})
export class OffersPage implements OnInit, OnDestroy {
  loadedPlacesFromService: Place[] = [];
  subscriptionPlaces!: Subscription;
  isLoading = false;

  constructor(
    private placesService: PlacesService,
    private menuCtrl: MenuController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPlacesFromService();
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.placesService.fetchPlaces().subscribe(() => {
      this.isLoading = false;
    });
  }

  loadPlacesFromService() {
    this.subscriptionPlaces = this.placesService.places.subscribe(
      (places) => (this.loadedPlacesFromService = places)
    );
  }

  onEdit(id: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'places', 'offers', 'edit', id]);
  }

  // onOpenMenu() {
  //   this.menuCtrl.toggle();
  // }

  ngOnDestroy() {
    if (this.subscriptionPlaces) this.subscriptionPlaces.unsubscribe();
  }
}
