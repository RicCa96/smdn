import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// ABSTRACT
import { AbstractLookupService } from '../shared/abstract/services/abstract-lookup.service';
// CONSTANTS
import { RESTAURANTS_API } from '../shared/constants/backend-routes.constants';
// MODELS
import { Restaurant } from '../models/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService extends AbstractLookupService<Restaurant> {

  constructor(
    restaurantsClient: HttpClient
  ) {
    super(RESTAURANTS_API, restaurantsClient);
  }

}
