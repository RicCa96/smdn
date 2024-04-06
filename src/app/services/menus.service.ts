import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PubMenu, RestaurantMenu} from "../models/dish.model";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MenusService {

  protected readonly dataLocation = 'assets/data/restaurants.json';

  protected menus?: { restaurant: RestaurantMenu, pub: PubMenu };
  protected menusUpdated = new Subject<{ restaurant: RestaurantMenu, pub: PubMenu }>();

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getMenus() {
    this.httpClient.get<{ restaurant: RestaurantMenu, pub: PubMenu }>(this.dataLocation)
      .subscribe({
        next: res => {
          this.menus = res;
          this.menusUpdated.next(this.menus);
        }
      });
  }

  getMenusUpdated(): Observable<{ restaurant: RestaurantMenu, pub: PubMenu }> {
    return this.menusUpdated.asObservable();
  }

}
