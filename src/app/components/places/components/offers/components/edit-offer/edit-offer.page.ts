import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { filter, Subscription } from 'rxjs';
import { Place } from 'src/app/components/places/models/places.model';
import { PlacesService } from 'src/app/components/places/services/places.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
  standalone: false,
})
export class EditOfferPage implements OnInit, OnDestroy {
  place!: Partial<Place>;
  form!: FormGroup;
  subscriptionPlace!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private router: Router,
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

  resetForm() {
    this.form.reset();
    this.router.navigateByUrl('/places/offers');
  }

  onUpdateOffer() {
    if (!this.form.valid) return;
    const { title, description, price } = this.form.value;

    const { _id } = this.place;

    if (!!_id) {
      this.loadingCtrl
        .create({
          message: 'Updating place...',
        })
        .then((loadingEl) => {
          loadingEl.present();

          this.placesService
            .updatePlace(_id, title, description, +price)
            .subscribe(() => {
              loadingEl.dismiss();
              this.resetForm();
            });
        });
    } else return;
  }

  ngOnDestroy() {
    if (this.subscriptionPlace) this.subscriptionPlace.unsubscribe();
  }
}
