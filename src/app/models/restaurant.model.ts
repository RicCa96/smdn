import { Dish } from './dish.model';
import { BaseModel } from '../shared/model/base.model';

export interface Restaurant extends BaseModel {
  name: string;
  description: string;
  menu: Dish[];
}
