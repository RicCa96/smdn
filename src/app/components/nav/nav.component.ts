import {Component, inject} from '@angular/core';
import {MenuItem} from "primeng/api";
import {NavService} from "../../shared/services/nav.service";
import {ButtonModule} from "primeng/button";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {NgOptimizedImage} from "@angular/common";
import {SidebarModule} from "primeng/sidebar";
import {MenuModule} from "primeng/menu";
import {DialogService} from "primeng/dynamicdialog";

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
   * @type {NavService}
   * @memberof NavComponent
   */
  private readonly navService = inject(NavService);

  /**
   * The TranslateService instance used to translate the menu items.
   *
   * @private
   * @type {TranslateService}
   * @memberof NavComponent
   */
  private readonly translateService = inject(TranslateService);

  private readonly dialogService = inject(DialogService);

  /**
   * Indicates whether the menu sidebar is visible or not.
   *
   * @public
   * @type {boolean}
   * @memberof NavComponent
   */
  public isMenuSidebarVisible = false;

  /**
   * The menu items to be displayed in the navigation menu.
   *
   * @public
   * @type {MenuItem[]}
   * @memberof NavComponent
   */
  public navItems: MenuItem[] = [];

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
        this.navService.setTranslation(evt.translations.menu);
        this.navItems = this.navService.getUserNavMenu();
      }
    });
  }


  navItemClick(): void {
    this.isMenuSidebarVisible = false;
    this.dialogService.dialogComponentRefMap.forEach(dialog => {
      dialog.destroy();
    });
  }

}
