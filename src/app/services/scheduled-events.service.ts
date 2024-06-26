import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
// ABSTRACT
import {AbstractLookupService} from '../shared/abstract/services/abstract-lookup.service';
// CONSTANTS
import {SCHEDULED_EVENTS_API} from '../shared/constants/backend-routes.constants';
// MODELS
import {ScheduledEvent} from '../models/scheduled-event.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduledEventService extends AbstractLookupService<ScheduledEvent> {

  constructor(
    scheduledEventsClient: HttpClient
  ) {
    super(SCHEDULED_EVENTS_API, scheduledEventsClient);
  }

  override getList(currentPage?: number, pageSize?: number) {
    const params = new HttpParams();
    if (currentPage && pageSize) {
      params.set('page', currentPage);
      params.set('pageSize', pageSize);
    }
    this.crudClient.get<ScheduledEvent[]>('assets/data/scheduledevents.json')
      .subscribe({
        next: res => {
          this.list = res;
          this.listUpdated.next({
            results: [...this.list],
            totalResults: this.list.length
          });
        }
      });
  }

}
