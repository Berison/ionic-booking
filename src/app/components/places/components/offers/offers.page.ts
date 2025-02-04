import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { Place } from '../../models/places.model';
import { IonItemSliding, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
  standalone: false,
})
export class OffersPage implements OnInit {
  loadedPlacesFromService: Place[] = [];
  constructor(
    private placesService: PlacesService,
    private menuCtrl: MenuController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPlacesFromService();
  }

  ionViewWillEnter() {
    this.loadPlacesFromService();
  }

  loadPlacesFromService() {
    this.loadedPlacesFromService = this.placesService.places;
  }

  onEdit(id: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'places', 'offers', 'edit', id]);
  }

  // onOpenMenu() {
  //   this.menuCtrl.toggle();
  // }
}
