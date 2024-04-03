import {ScheduledEventService} from '../../../services/scheduled-events.service';
import {ScheduledEvent, ScheduledEventsUtils} from '../../../models/scheduled-event.model';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {RouterLink} from "@angular/router";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {DatePipe} from "@angular/common";
import {StringUtils} from "../../../shared/utils/string.utils";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.less'],
  standalone: true,
  imports: [
    RouterLink,
    TranslateModule,
    DatePipe
  ]
})
export class EventsComponent implements OnInit, OnDestroy {

  monthLabel: { full: string, short: string }[] = [];

  private listSubs?: Subscription;
  list: ScheduledEvent[] = [];
  loading = false;
  schedule: { date: string, month: number, events: ScheduledEvent[] }[] = [];

  get translatePrefix(): string {
    return 'pages.public.events.';
  }

  constructor(
    public scheduledEventsService: ScheduledEventService,
    private translate: TranslateService
  ) {
    this.translate.get(this.translatePrefix + 'monthLabels').subscribe({
      next: res => this.monthLabel = res
    })
  }

  ngOnInit() {
    this.loading = true;
    this.scheduledEventsService
      .getList();
    this.listSubs = this.scheduledEventsService
      .getListUpdated()
      .subscribe({
        next: res => {
          this.list = ScheduledEventsUtils.sortList(res.results);
          this.buildSchedule();
          this.loading = false;
        }
      });
  }

  ngOnDestroy() {
    this.listSubs?.unsubscribe();
  }

  buildSchedule() {
    for (const el of this.list) {
      el.date = new Date(el.date);
      let existingIndex = -1;
      this.schedule.some(
        (scheduledDay, index) => {
          if (scheduledDay.date === StringUtils.pad(el.date.getDate()) && scheduledDay.month === el.date.getMonth()) {
            existingIndex = index;
            return true;
          }
          return false;
        }
      );
      if (existingIndex !== -1) {
        this.schedule[existingIndex].events.push(el);
      } else {
        const newScheduledDay = {
          date: StringUtils.pad(el.date.getDate()),
          month: el.date.getMonth(),
          events: [el]
        };
        this.schedule.push(newScheduledDay);
      }
    }
  }

}
