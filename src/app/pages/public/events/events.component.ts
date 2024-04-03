import {ScheduledEventService} from '../../../services/scheduled-events.service';
import {ScheduledEvent} from '../../../models/scheduled-event.model';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {RouterLink} from "@angular/router";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.less'],
  standalone: true,
  imports: [RouterLink, TranslateModule]
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
      .subscribe(
        response => {
          this.list = response.results;
          this.sortList();
          this.buildSchedule();
          this.loading = false;
        }
      );
  }

  ngOnDestroy() {
    this.listSubs?.unsubscribe();
  }

  pad(n: number, width = 2, z = '0'): string {
    z = z || '0';
    const num = n + '';
    return num.length >= width ? num : new Array(width - num.length + 1).join(z) + num;
  }

  sortList() {
    this.list = [...this.list].sort((a, b) => {
      a.date = new Date(a.date);
      b.date = new Date(b.date);
      if (a.date.getMonth() > b.date.getMonth()) {
        return 1;
      } else if (a.date.getMonth() < b.date.getMonth()) {
        return -1;
      } else {
        // same month, sort by date
        if (a.date.getDate() > b.date.getDate()) {
          return 1;
        } else if (a.date.getDate() < b.date.getDate()) {
          return -1;
        } else {
          // same month and day, sort by time alphabetically
          if (a.time > b.time) {
            return 1;
          } else if (a.time < b.time) {
            return -1;
          } else {
            return 0;
          }
        }
      }
    });
  }

  buildSchedule() {
    for (const el of this.list) {
      el.date = new Date(el.date);
      let existingIndex = -1;
      this.schedule.some(
        (scheduledDay, index) => {
          if (scheduledDay.date === this.pad(el.date.getDate()) && scheduledDay.month === el.date.getMonth()) {
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
          date: this.pad(el.date.getDate()),
          month: el.date.getMonth(),
          events: [el]
        };
        this.schedule.push(newScheduledDay);
      }
    }
  }

}
