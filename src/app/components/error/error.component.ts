import {Component} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {ButtonModule} from 'primeng/button';
import {TranslateModule} from "@ngx-translate/core";

/**
 * The ErrorComponent displays an error message in a dialog box.
 * It is used to inform the user of an error that has occurred in the application.
 *
 * @example
 * <app-error></app-error>
 *
 * @export
 * @class ErrorComponent
 */
@Component({
  standalone: true,
  imports: [ButtonModule, TranslateModule],
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.less']
})
export class ErrorComponent {

  /**
   * Creates an instance of ErrorComponent.
   * @param {DynamicDialogRef} ref - The reference to the dialog box.
   * @param {DynamicDialogConfig} config - The configuration for the dialog box.
   * @memberof ErrorComponent
   */
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
  }

}
