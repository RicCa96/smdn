import { DishCategory } from './dish-category.model';
import { BaseModel } from '../shared/model/base.model';

export interface Dish extends BaseModel {
  name: string;
  category: DishCategory;
  price: number;
}
