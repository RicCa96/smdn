import {Component} from '@angular/core';
import {environment} from "../../../environments/environment";
import {TranslateService} from "@ngx-translate/core";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";

/**
 * The LangDropdownComponent displays a dropdown menu for selecting a language.
 *
 * @class LangDropdownComponent
 */
@Component({
  selector: 'app-lang-dropdown',
  standalone: true,
  imports: [DropdownModule, FormsModule],
  templateUrl: './lang-dropdown.component.html',
  styleUrls: ['./lang-dropdown.component.less']
})
export class LangDropdownComponent {
  /**
   * The available language options for the dropdown menu.
   *
   * @property {Array} langOptions
   * @readonly
   */
  readonly langOptions = environment.langOptions;

  /**
   * The currently selected language.
   *
   * @property {string} lang
   */
  lang: string = this.langOptions[0];

  /**
   * Creates a new instance of the LangDropdownComponent.
   *
   * @constructor
   * @param {TranslateService} translateService - The TranslateService for translating the app.
   */
  constructor(
    private translateService: TranslateService
  ) {
  }

  /**
   * Sets the selected language for the app using the TranslateService.
   *
   * @method translate
   * @returns {void}
   */
  translate(): void {
    this.translateService.use(this.lang);
  }
}
