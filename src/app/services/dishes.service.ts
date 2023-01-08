import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// ABSTRACT
import { AbstractLookupService } from '../shared/abstract/services/abstract-lookup.service';
// CONSTANTS
import { DISHES_API } from '../shared/constants/backend-routes.constants';
// MODELS
import { Dish } from '../models/dish.model';

@Injectable({
  providedIn: 'root'
})
export class DishesService extends AbstractLookupService<Dish> {

  constructor(
    dishesClient: HttpClient
  ) {
    super(DISHES_API, dishesClient);
  }

}
