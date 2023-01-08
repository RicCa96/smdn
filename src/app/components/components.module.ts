import {NgModule} from '@angular/core';
import {LangDropdownModule} from "./lang-dropdown/lang-dropdown.module";
import {ErrorModule} from "./error/error.module";
import {NavModule} from "./nav/nav.module";


@NgModule({
  exports: [
    LangDropdownModule,
    ErrorModule,
    NavModule
  ]
})
export class ComponentsModule {
}
