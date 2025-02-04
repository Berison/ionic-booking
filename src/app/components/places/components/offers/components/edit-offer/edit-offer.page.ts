import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Place } from 'src/app/components/places/models/places.model';
import { PlacesService } from 'src/app/components/places/services/places.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
  standalone: false,
})
export class EditOfferPage implements OnInit {
  place!: Partial<Place>;
  form!: FormGroup;

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

      this.place = this.placesService.getPlaceById(
        paramMap.get('placeId') || ''
      );

      this.createForm(this.place);
    });
  }

  createForm(place: Partial<Place>) {
    this.form = new FormGroup({
      title: new FormControl(place.title, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      description: new FormControl(place.description, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)],
      }),
      price: new FormControl(place.price, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)],
      }),
    });
  }

  onUpdateOffer() {
    if (!this.form.valid) return;
  }
}
