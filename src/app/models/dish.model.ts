import {BaseModel} from "../shared/model/base.model";

export interface Dish extends BaseModel {
  name: string;
  options?: string[];
  price: number;
}

export interface RestaurantMenu {
  appetizers?: Dish[];
  pasta?: Dish[];
  mains?: Dish[];
  sides?: Dish[];
  desserts?: Dish[];
  drinks?: Dish[];
}

export interface PubMenu {
  hamburgers?: Dish[];
  sandwiches?: Dish[];
  sides?: Dish[];
  drinks?: Dish[];
}
