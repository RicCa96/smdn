import {Component, inject} from '@angular/core';
import {MenuItem} from "primeng/api";
import {MenuService} from "../../shared/services/menu.service";

@Component({
  selector: '[app-nav]',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})
export class NavComponent {

  private menuService = inject(MenuService);

  public menuItems: MenuItem[];

  constructor() {
    this.menuItems = this.menuService.getUserMenu();
  }

}
