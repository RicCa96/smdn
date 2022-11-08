import {Component} from '@angular/core';
import {environment} from "../../../environments/environment";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-lang-dropdown',
  templateUrl: './lang-dropdown.component.html',
  styleUrls: ['./lang-dropdown.component.less']
})
export class LangDropdownComponent {

  readonly langOptions = environment.langOptions;

  lang: string = this.langOptions[0].value;

  constructor(
    private translateService: TranslateService
  ) {
  }

  translate(): void {
    this.translateService.use(this.lang);
  }

}
