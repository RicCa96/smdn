import { environment } from 'src/environments/environment';

/**
 * @path http://localhost:3000/auth
 */
export const AUTH_API = `${environment.apiUrl}/auth`;

/**
 * @path http://localhost:3000/dishes
 */
export const DISHES_API = `${environment.apiUrl}/dishes`;

/**
 * @path http://localhost:3000/dish-categories
 */
export const DISH_CATEGORIES_API = `${environment.apiUrl}/dish-categories`;

/**
 * @path http://localhost:3000/orders
 */
export const ORDERS_API = `${environment.apiUrl}/orders`;

/**
 * @path http://localhost:3000/restaurants
 */
export const RESTAURANTS_API = `${environment.apiUrl}/restaurants`;

/**
 * @path http://localhost:3000/scheduled-events
 */
export const SCHEDULED_EVENTS_API = `${environment.apiUrl}/scheduled-events`;
