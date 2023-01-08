import { Dish } from './dish.model';
import { BaseModel } from '../shared/model/base.model';

export interface OrderDishes extends BaseModel {
  dish: Dish;
  quantity: number;
  notes: string;
}
