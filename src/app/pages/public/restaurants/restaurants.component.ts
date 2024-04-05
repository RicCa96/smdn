import {Component, inject, OnInit} from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";
import {RestaurantPickerComponent} from "../../../components/restaurant-picker/restaurant-picker.component";
import {RestaurantTypeEnum} from "../../../enums/restaurant-type.enum";

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [],
  templateUrl: './restaurants.component.html',
  styleUrl: './restaurants.component.less'
})
export class RestaurantsComponent implements OnInit {

  private readonly dialogService: DialogService = inject(DialogService);

  selectedRestaurant?: RestaurantTypeEnum;

  get translatePrefix(): string {
    return 'pages.public.restaurants.';
  }


  ngOnInit() {
    const ref = this.dialogService.open(RestaurantPickerComponent, {
      showHeader: false,
      styleClass: 'full-size-dialog',
      width: '100%',
      height: '100%',
    });

    ref.onClose.subscribe({
      next: (selection: RestaurantTypeEnum) => {
        this.selectedRestaurant = selection;
        // TODO load the correct menu and display it
      }
    })
  }
}
