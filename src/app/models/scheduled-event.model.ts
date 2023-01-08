import { BaseModel } from '../shared/model/base.model';

export interface ScheduledEvent extends BaseModel {
  date: Date;
  time: string;
  title: string;
  subtitle: string;
}
