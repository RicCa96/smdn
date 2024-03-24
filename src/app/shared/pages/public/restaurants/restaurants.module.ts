import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantsComponent } from './restaurants.component';
import { RouterModule } from '@angular/router';
import { GsrFooterModule } from '../../../components/gsr-footer/gsr-footer.module';



@NgModule({
  declarations: [
    RestaurantsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    GsrFooterModule,
  ]
})
export class RestaurantsModule { }
