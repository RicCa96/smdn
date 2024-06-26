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
export class NavService {

  private _translation!: MenuTranslation;

  constructor() {
  }

  setTranslation(translation: MenuTranslation): void {
    this._translation = translation;
  }

  getUserNavMenu(): MenuItem[] {
    return [...this.publicNavMenu()];
  }

  publicNavMenu(): MenuItem[] {
    return [
      {
        label: this._translation.public.home,
        routerLink: '/'
      },
      {
        label: this._translation.public.events,
        routerLink: '/events'
      },
      {
        label: this._translation.public.restaurants,
        routerLink: '/restaurants'
      },
    ];
  }

}
