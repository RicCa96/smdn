import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events.component';
import { RouterModule } from '@angular/router';
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [
    EventsComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule,
    ]
})
export class EventsModule { }
