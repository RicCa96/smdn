import {Component, inject} from '@angular/core';
import {MenuItem} from "primeng/api";
import {MenuService} from "../../shared/services/menu.service";
import {ButtonModule} from "primeng/button";
import {SlideMenuModule} from "primeng/slidemenu";

@Component({
  selector: '[smdn-nav]',
  standalone: true,
  imports: [ButtonModule, SlideMenuModule],
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
