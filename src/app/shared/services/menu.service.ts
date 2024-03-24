import {Injectable} from '@angular/core';
import {MenuItem} from 'primeng/api';

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
        url: ''
      },
      {
        label: this._translation.public.events,
        url: 'events'
      },
      {
        label: this._translation.public.restaurants,
        // url: 'restaurants'
      },
    ];
  }

}
