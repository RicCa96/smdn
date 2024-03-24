import { Component } from '@angular/core';
import { Restaurant } from '../../../models/restaurant.model';
import { AbstractListComponent } from '../../../shared/abstract/pages/abstract-list.component';
import { AuthService } from '../../../services/auth.service';
import { RestaurantsService } from '../../../services/restaurants.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent extends AbstractListComponent<Restaurant> {

  constructor(
    authService: AuthService,
    public restaurantsService: RestaurantsService
  ) {
    super(authService, restaurantsService);
  }

  get displayedColumns() {
    const rv = ['name', 'description'];
    if (this.userIsAdmin) { rv.push('actions'); }
    return rv;
  }

  sortList() {
    this.list = [...this.list].sort((a, b) => {
      return a.name > b.name ? 1 : a.name === b.name ? 0 : -1;
    });
  }

}
