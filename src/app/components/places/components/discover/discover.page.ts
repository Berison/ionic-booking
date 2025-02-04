import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { Place } from '../../models/places.model';
import { SegmentChangeEventDetail } from '@ionic/angular';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
  standalone: false,
})
export class DiscoverPage implements OnInit {
  loadedPlacesFromService: Place[] = [];
  constructor(private placesService: PlacesService) {}

  ngOnInit() {
    this.loadPlacesFromService();
  }

  ionViewWillEnter() {
    this.loadPlacesFromService();
  }

  loadPlacesFromService() {
    this.loadedPlacesFromService = this.placesService.places;
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail);
  }
}
