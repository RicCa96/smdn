import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: ``,
    loadComponent: () => import('./pages/public/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: `events`,
    loadComponent: () => import('./pages/public/events/events.component').then(c => c.EventsComponent)
  },
  {
    path: `restaurants`,
    loadComponent: () => import('./pages/public/restaurants/restaurants.component').then(c => c.RestaurantsComponent)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
