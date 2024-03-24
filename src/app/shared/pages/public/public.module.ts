import { NgModule } from '@angular/core';
import { HomeModule } from './home/home.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { OrdersModule } from './orders/orders.module';
import { EventsModule } from './events/events.module';
import { PublicRoutingModule } from './public-routing.module';



@NgModule({
  imports: [
    PublicRoutingModule,
  ],
  exports: [
    HomeModule,
    EventsModule,
    RestaurantsModule,
    OrdersModule,
  ]
})
export class PublicModule { }
