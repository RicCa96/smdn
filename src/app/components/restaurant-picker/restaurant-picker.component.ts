import {Component} from '@angular/core';
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {RestaurantTypeEnum} from "../../enums/restaurant-type.enum";
import {NgClass} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-restaurant-picker',
  standalone: true,
  imports: [
    NgClass,
    TranslateModule
  ],
  templateUrl: './restaurant-picker.component.html',
  styleUrl: './restaurant-picker.component.less'
})
export class RestaurantPickerComponent {

  protected readonly options: string[] = [
    RestaurantTypeEnum.restaurant,
    RestaurantTypeEnum.pub
  ];

  constructor(
    protected ref: DynamicDialogRef
  ) {
  }

}
