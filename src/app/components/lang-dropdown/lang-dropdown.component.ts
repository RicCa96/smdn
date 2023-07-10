/**
 * LangDropdownComponent is an Angular component that represents a language dropdown.
 * It allows the user to select a language and triggers a translation when the language is changed.
 */
import { Component } from '@angular/core';
import { environment } from "../../../environments/environment";
import { TranslateService } from "@ngx-translate/core";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-lang-dropdown',
  standalone: true,
  imports: [DropdownModule, FormsModule],
  templateUrl: './lang-dropdown.component.html',
  styleUrls: ['./lang-dropdown.component.less']
})
export class LangDropdownComponent {

  /**
   * langOptions represents the available language options.
   * It is populated from the environment configuration.
   */
  readonly langOptions = environment.langOptions;

  /**
   * lang represents the currently selected language.
   * It is initialized with the first option from langOptions.
   */
  lang: string = this.langOptions[0];

  /**
   * Creates an instance of LangDropdownComponent.
   * @param translateService The TranslateService used for language translation.
   */
  constructor(
    private translateService: TranslateService
  ) {
  }

  /**
   * Translates the application to the selected language.
   * It calls the TranslateService's use() method with the selected language.
   */
  translate(): void {
    this.translateService.use(this.lang);
  }

}
