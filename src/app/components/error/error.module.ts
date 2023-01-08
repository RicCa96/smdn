import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {ErrorComponent} from './error.component';
import {ButtonModule} from "primeng/button";


@NgModule({
  declarations: [
    ErrorComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule
  ],
  exports: [
    ErrorComponent
  ]
})
export class ErrorModule {
}
