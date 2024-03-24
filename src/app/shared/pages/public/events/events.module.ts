import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events.component';
import { RouterModule } from '@angular/router';
import { GsrFooterModule } from '../../../components/gsr-footer/gsr-footer.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    EventsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    GsrFooterModule,
    MatProgressSpinnerModule
  ]
})
export class EventsModule { }
