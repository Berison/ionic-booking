import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './components/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'places',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./components/auth/auth.module').then((m) => m.AuthPageModule),
  },
  {
    path: 'places',
    loadChildren: () =>
      import('./components/places/places.module').then(
        (m) => m.PlacesPageModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'bookings',
    loadChildren: () =>
      import('./components/bookings/bookings.module').then(
        (m) => m.BookingsPageModule
      ),
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
