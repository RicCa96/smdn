import {Component, inject} from '@angular/core';
import {MenuItem} from "primeng/api";
import {MenuService} from "../../shared/services/menu.service";
import {ButtonModule} from "primeng/button";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {NgOptimizedImage} from "@angular/common";
import {SidebarModule} from "primeng/sidebar";
import {MenuModule} from "primeng/menu";

/**
 * The NavComponent displays the navigation menu for the application.
 * It uses PrimeNG's SlideMenu component to display the menu items.
 *
 * @class NavComponent
 */
@Component({
  selector: '[smdn-nav]',
  standalone: true,
  imports: [ButtonModule, NgOptimizedImage, SidebarModule, MenuModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})
export class NavComponent {

  /**
   * The MenuService instance used to retrieve the menu items.
   *
   * @private
   * @type {MenuService}
   * @memberof NavComponent
   */
  private menuService = inject(MenuService);

  /**
   * The TranslateService instance used to translate the menu items.
   *
   * @private
   * @type {TranslateService}
   * @memberof NavComponent
   */
  private translateService = inject(TranslateService);

  /**
   * Indicates whether the menu sidebar is visible or not.
   *
   * @type {boolean}
   */
  public isMenuSidebarVisible = false;

  /**
   * The menu items to be displayed in the navigation menu.
   *
   * @public
   * @type {MenuItem[]}
   * @memberof NavComponent
   */
  public menuItems: MenuItem[] = [];

  /**
   * Creates an instance of NavComponent.
   * @memberof NavComponent
   */
  constructor() {
    /**
     * Subscribes to the onLangChange event of the TranslateService to update the menu items
     * when the language is changed.
     */
    this.translateService.onLangChange.subscribe({
      next: (evt: LangChangeEvent) => {
        this.menuService.setTranslation(evt.translations.menu);
        this.menuItems = this.menuService.getUserMenu();
      }
    });
  }

}
