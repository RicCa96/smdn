import { NgModule } from '@angular/core';
import { EventsModule } from './events/events.module';
import { PublicRoutingModule } from './public-routing.module';



@NgModule({
  imports: [
    PublicRoutingModule,
  ],
  exports: [
    EventsModule,
  ]
})
export class PublicModule { }
