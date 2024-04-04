import {Component} from '@angular/core';

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [],
  templateUrl: './restaurants.component.html',
  styleUrl: './restaurants.component.less'
})
export class RestaurantsComponent {

  get translatePrefix(): string {
    return 'pages.public.restaurants.';
  }

  // TODO onInit select 'trattoria' or 'birreria' before loading and showing the correct menu
}
