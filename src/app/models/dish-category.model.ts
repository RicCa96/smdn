import { BaseModel } from '../shared/model/base.model';

export interface DishCategory extends BaseModel {
  code: string;
  description: string;
}
