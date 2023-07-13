import {inject, Injectable} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {AuthService} from '../../services/auth.service';

interface MenuTranslation {
  public: {
    home: string;
    schedule: string;
    orders: string;
  };
  admin: {
    security: {
      label: string;
      signup: string;
    };
    collections: {
      label: string;
      dish_categories: string;
      dishes: string;
      restaurants: string;
      scheduled_events: string;
    };
  };
  auth: {
    pos: {
      label: string;
      counter: string;
    };
    reports: {
      label: string;
      emitted_orders: string;
    };
  }
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private _translation!: MenuTranslation;

  private authService = inject(AuthService);

  constructor() {
  }

  setTranslation(translation: MenuTranslation): void {
    this._translation = translation;
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
        label: this._translation.public.home,
        url: ''
      },
      {
        label: this._translation.public.schedule,
        // url: 'schedule'
      },
      {
        label: this._translation.public.orders,
        // url: 'orders'
      },
    ];
  }

  adminMenu(): MenuItem[] {
    return [
      {
        label: this._translation.admin.security.label,
        items: [
          {
            label: this._translation.admin.security.signup,
            // url: 'auth/signup'
          }
        ]
      },
      {
        label: this._translation.admin.collections.label,
        items: [
          {
            label: this._translation.admin.collections.dish_categories,
            // url: 'collections/dish-categories'
          },
          {
            label: this._translation.admin.collections.dishes,
            // url: 'collections/dishes'
          },
          {
            label: this._translation.admin.collections.restaurants,
            // url: 'collections/restaurants'
          },
          {
            label: this._translation.admin.collections.scheduled_events,
            // url: 'collections/scheduled-events'
          }
        ]
      }
    ];
  }

  authMenu(): MenuItem[] {
    return [
      {
        label: this._translation.auth.pos.label,
        items: [
          {
            label: this._translation.auth.pos.counter,
            // url: 'pos/counter'
          }
        ]
      },
      {
        label: this._translation.auth.reports.label,
        items: [
          {
            label: this._translation.auth.reports.emitted_orders,
            url: ''
          }
        ]
      }
    ];
  }

}
