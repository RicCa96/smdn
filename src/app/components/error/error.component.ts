import {Component} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.less']
})
export class ErrorComponent {

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
  }

}
