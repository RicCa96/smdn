import { BaseModel } from '../shared/model/base.model';
import { Restaurant } from './restaurant.model';
import { OrderDishes } from './order-dishes.model';

export interface Order extends BaseModel {
  number: string;
  date: Date;
  reservation_name: string;
  guests_number: number;
  restaurant: Restaurant;
  is_payed: boolean;
  order: OrderDishes[];
}
