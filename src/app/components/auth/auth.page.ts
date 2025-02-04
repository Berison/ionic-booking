import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: false,
})
export class AuthPage implements OnInit {
  userIsAuthenticated = false;
  isLogin = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  onLogin() {
    this.authService.login();
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Loading in...' })
      .then((loadingEl) => {
        loadingEl.present();
        setTimeout(() => {
          loadingEl.dismiss();
          this.router.navigateByUrl('/places/discover');
        }, 1500);
      });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    const { email, password } = form.value;

    if (this.isLogin) {
      // Send request to login servers
    } else {
      // Send request to signup servers
    }
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }
}
