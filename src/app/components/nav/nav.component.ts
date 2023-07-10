/**
 * NavComponent is an Angular component that represents a navigation menu.
 * It displays a menu with items retrieved from the MenuService.
 */
import { Component, inject } from '@angular/core';
import { MenuItem } from "primeng/api";
import { MenuService } from "../../shared/services/menu.service";
import { ButtonModule } from "primeng/button";
import { SlideMenuModule } from "primeng/slidemenu";

@Component({
  selector: '[smdn-nav]',
  standalone: true,
  imports: [ButtonModule, SlideMenuModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})
export class NavComponent {

  private menuService = inject(MenuService);

  /**
   * menuItems represents the menu items to be displayed in the navigation menu.
   */
  public menuItems: MenuItem[];

  /**
   * Creates an instance of NavComponent.
   */
  constructor() {
    this.menuItems = this.menuService.getUserMenu();
  }

}
