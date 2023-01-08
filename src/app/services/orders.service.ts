import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// ABSTRACT
import { AbstractLookupService } from '../shared/abstract/services/abstract-lookup.service';
// CONSTANTS
import { ORDERS_API } from '../shared/constants/backend-routes.constants';
// MODELS
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService extends AbstractLookupService<Order> {

  constructor(
    ordersClient: HttpClient
  ) {
    super(ORDERS_API, ordersClient);
  }

}
