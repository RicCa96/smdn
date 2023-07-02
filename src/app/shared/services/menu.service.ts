import {inject, Injectable} from '@angular/core';
import {MenuItem} from "primeng/api";
import {AuthService} from "../../services/auth.service";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private authService = inject(AuthService);
  private translateService = inject(TranslateService);

  constructor() {
  }

  getUserMenu(): MenuItem[] {
    let rv = [...this.publicMenu()];
    if (this.authService.getIsAuthenticated()) {
      if (this.authService.isUserAdmin()) {
        rv = [...rv, ...this.adminMenu()];
      }
      rv = [...rv, ...this.authMenu()];
    }
    return rv;
  }

  get separator(): MenuItem {
    return {
      separator: true
    } as MenuItem;
  }

  publicMenu(): MenuItem[] {
    return [
      {
        label: this.translateService.instant('menu.public.home'),
        url: ''
      },
      {
        label: 'menu.public.schedule',
        // url: 'schedule'
      },
      {
        label: 'menu.public.orders',
        // url: 'orders'
      },
    ];
  }

  adminMenu(): MenuItem[] {
    return [
      {
        label: 'menu.admin.security.label',
        items: [
          {
            label: 'menu.admin.security.signup',
            // url: 'auth/signup'
          }
        ]
      },
      {
        label: 'menu.admin.collections.label',
        items: [
          {
            label: 'menu.admin.collections.dish-categories',
            // url: 'collections/dish-categories'
          },
          {
            label: 'menu.admin.collections.dishes',
            // url: 'collections/dishes'
          },
          {
            label: 'menu.admin.collections.restaurants',
            // url: 'collections/restaurants'
          },
          {
            label: 'menu.admin.collections.scheduled-events',
            // url: 'collections/scheduled-events'
          }
        ]
      }
    ];
  }

  authMenu(): MenuItem[] {
    return [
      {
        label: 'menu.auth.pos.label',
        items: [
          {
            label: 'menu.auth.pos.counter',
            // url: 'pos/counter'
          }
        ]
      },
      {
        label: 'menu.auth.reports.label',
        items: [
          {
            label: 'menu.auth.pos.emitted-orders',
            url: ''
          }
        ]
      }
    ];
  }

}
