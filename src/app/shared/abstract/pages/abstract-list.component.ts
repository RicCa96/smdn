import {Directive, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AbstractCrudService} from '../services/abstract-crud.service';
import {AbstractComponent} from './abstract.component';
import {BaseModel} from '../../model/base.model';

@Directive()
export abstract class AbstractListComponent<T extends BaseModel> extends AbstractComponent implements OnInit, OnDestroy {

  private listSubs: Subscription | undefined;

  list: T[] = [];
  totalRecords = 0;
  pageSize = 10;
  currentPage = 1;
  pageSizeOptions = [5, 10, 25, 50, 100];

  protected constructor(
    protected listService: AbstractCrudService<T>
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.loading = true;
    this.listService.getList(this.currentPage, this.pageSize);
    this.listSubs = this.listService.getListUpdated()
      .subscribe({
        next: response => {
          this.list = response.results;
          this.totalRecords = response.totalResults;
          this.loading = false;
          this.afterOnInit();
        }
      });
  }

  afterOnInit(): void {
    this.sortList();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.listSubs?.unsubscribe();
  }

  sortList(): void {
    this.list = [...this.list];
  }

  abstract get displayedColumns(): string[];

}
