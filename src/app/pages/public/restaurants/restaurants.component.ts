import {Component, inject, OnInit} from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";
import {RestaurantPickerComponent} from "../../../components/restaurant-picker/restaurant-picker.component";
import {RestaurantTypeEnum} from "../../../enums/restaurant-type.enum";
import {CurrencyPipe} from "@angular/common";
import {Dish, PubMenu, RestaurantMenu} from "../../../models/dish.model";
import {MenusService} from "../../../services/menus.service";
import {Subscription} from "rxjs";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [
    TranslateModule,
    CurrencyPipe
  ],
  templateUrl: './restaurants.component.html',
  styleUrl: './restaurants.component.less'
})
export class RestaurantsComponent implements OnInit {

  private readonly dialogService: DialogService = inject(DialogService);
  private readonly menusService: MenusService = inject(MenusService);

  menus?: { restaurant: RestaurantMenu, pub: PubMenu };
  menusSubscription?: Subscription;

  selectedRestaurant?: RestaurantTypeEnum;

  get currentMenu(): RestaurantMenu | PubMenu {
    if (!this.menus || !this.selectedRestaurant) {
      return [] as RestaurantMenu | PubMenu;
    }
    return this.menus[this.selectedRestaurant];
  }

  get translatePrefix(): string {
    return 'pages.public.restaurants.';
  }

  ngOnInit() {
    this.menusService.getMenus();
    this.menusSubscription = this.menusService.getMenusUpdated()
      .subscribe({
        next: res => this.menus = res
      });
    this.openRestaurantPicker();
  }

  protected openRestaurantPicker() {
    const ref = this.dialogService.open(RestaurantPickerComponent, {
      showHeader: false,
      styleClass: 'full-size-dialog',
      width: '100%',
      height: '100%',
    });
    ref.onClose.subscribe({
      next: (selection: RestaurantTypeEnum) => {
        this.selectedRestaurant = selection;
      }
    })
  }

  protected getMenuCategories(menu: RestaurantMenu | PubMenu) {
    return Object.keys(menu);
  }

  protected getMenuItems(menu: RestaurantMenu | PubMenu, category: string): Dish[] {
    return (menu as { [key: string]: Dish[] })[category];
  }
}
