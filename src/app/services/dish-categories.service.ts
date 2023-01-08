import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// ABSTRACT
import { AbstractLookupService } from '../shared/abstract/services/abstract-lookup.service';
// CONSTANTS
import { DISH_CATEGORIES_API } from '../shared/constants/backend-routes.constants';
// MODELS
import { DishCategory } from '../models/dish-category.model';

@Injectable({
  providedIn: 'root'
})
export class DishCategoriesService extends AbstractLookupService<DishCategory> {

  constructor(
    dishCategoriesClient: HttpClient
  ) {
    super(DISH_CATEGORIES_API, dishCategoriesClient);
  }

}
