import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// COMPONENTS
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  { path: ``, component: HomeComponent }, // map to the landing page
  { path: `events`, component: EventsComponent },
  // { path: `restaurants`, component: RestaurantsComponent },
  // { path: `orders`, component: OrdersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
