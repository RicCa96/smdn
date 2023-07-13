/**
 * NavComponent is an Angular component that represents a navigation menu.
 * It displays a menu with items retrieved from the MenuService.
 */
import {Component, inject} from '@angular/core';
import {MenuItem} from "primeng/api";
import {MenuService} from "../../shared/services/menu.service";
import {ButtonModule} from "primeng/button";
import {SlideMenuModule} from "primeng/slidemenu";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";

@Component({
  selector: '[smdn-nav]',
  standalone: true,
  imports: [ButtonModule, SlideMenuModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})
export class NavComponent {

  private menuService = inject(MenuService);
  private translateService = inject(TranslateService);

  /**
   * menuItems represents the menu items to be displayed in the navigation menu.
   */
  public menuItems: MenuItem[] = [];

  /**
   * Creates an instance of NavComponent.
   */
  constructor() {
    this.translateService.onLangChange.subscribe({
      next: (evt: LangChangeEvent) => {
        this.menuService.setTranslation(evt.translations.menu);
        this.menuItems = this.menuService.getUserMenu();
      }
    });
  }

}
