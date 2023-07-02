import {Component} from '@angular/core';
import {environment} from "../../../environments/environment";
import {TranslateService} from "@ngx-translate/core";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-lang-dropdown',
  standalone: true,
  imports: [DropdownModule, FormsModule],
  templateUrl: './lang-dropdown.component.html',
  styleUrls: ['./lang-dropdown.component.less']
})
export class LangDropdownComponent {

  readonly langOptions = environment.langOptions;

  lang: string = this.langOptions[0];

  constructor(
    private translateService: TranslateService
  ) {
  }

  translate(): void {
    this.translateService.use(this.lang);
  }

}
