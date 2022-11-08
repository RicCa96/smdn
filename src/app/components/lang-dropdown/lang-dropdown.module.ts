import {NgModule} from '@angular/core';
import {LangDropdownComponent} from './lang-dropdown.component';
import {DropdownModule} from "primeng/dropdown";
import {MySharedModule} from "../../shared/my-shared.module";


@NgModule({
  declarations: [
    LangDropdownComponent
  ],
  exports: [
    LangDropdownComponent
  ],
  imports: [
    MySharedModule,
    DropdownModule
  ]
})
export class LangDropdownModule {
}
