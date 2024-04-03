import {BaseModel} from '../shared/model/base.model';

export interface ScheduledEvent extends BaseModel {
  date: Date;
  time: string;
  title: string;
  subtitle: string;
}

export class ScheduledEventsUtils {

  static sortList(list: ScheduledEvent[]): ScheduledEvent[] {
    return [...list].sort((a, b) => {
      const ad = new Date(a.date),
        at = a.time,
      bd = new Date(b.date),
        bt = b.time
      if (ad.getMonth() > bd.getMonth()) {
        return 1;
      } else if (ad.getMonth() < bd.getMonth()) {
        return -1;
      } else {
        // same month, sort by date
        if (ad.getDate() > bd.getDate()) {
          return 1;
        } else if (ad.getDate() < bd.getDate()) {
          return -1;
        } else {
          // same month and day, sort by time alphabetically
          if (at > bt) {
            return 1;
          } else if (at < bt) {
            return -1;
          } else {
            return 0;
          }
        }
      }
    });
  }

}
