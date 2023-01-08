import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// ABSTRACT
import { AbstractLookupService } from '../shared/abstract/services/abstract-lookup.service';
// CONSTANTS
import { SCHEDULED_EVENTS_API } from '../shared/constants/backend-routes.constants';
// MODELS
import { ScheduledEvent } from '../models/scheduled-event.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduledEventService extends AbstractLookupService<ScheduledEvent> {

  constructor(
    scheduledEventsClient: HttpClient
  ) {
    super(SCHEDULED_EVENTS_API, scheduledEventsClient);
  }

}
