import {Injectable} from '@angular/core';
import {MenuItem, PrimeIcons} from 'primeng/api';

interface MenuTranslation {
  public: {
    home: string;
    events: string;
    restaurants: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private _translation!: MenuTranslation;

  constructor() {
  }

  setTranslation(translation: MenuTranslation): void {
    this._translation = translation;
  }

  getUserMenu(): MenuItem[] {
    return [...this.publicMenu()];
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
        routerLink: '',
        icon: PrimeIcons.HOME
      },
      {
        label: this._translation.public.events,
        routerLink: 'events',
        icon: PrimeIcons.CALENDAR
      },
      {
        label: this._translation.public.restaurants,
        routerLink: 'restaurants'
      },
    ];
  }

}
