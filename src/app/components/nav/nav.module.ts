import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavComponent} from "./nav.component";
import {ButtonModule} from "primeng/button";
import {SlideMenuModule} from "primeng/slidemenu";


@NgModule({
  declarations: [
    NavComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    SlideMenuModule
  ],
  exports: [
    NavComponent
  ]
})
export class NavModule {
}
