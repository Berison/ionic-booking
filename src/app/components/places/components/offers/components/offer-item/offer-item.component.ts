import { Component, Input, OnInit } from '@angular/core';
import { Place } from 'src/app/components/places/models/places.model';

@Component({
  selector: 'offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.scss'],
  standalone: false,
})
export class OfferItemComponent implements OnInit {
  @Input() place!: Place;

  constructor() {}

  ngOnInit() {}

  getDummyDate() {
    return new Date();
  }
}
