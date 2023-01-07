import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

export abstract class AbstractCrudService<T> {

  private list: T[] = [];
  private listUpdated = new Subject<{ totalResults: number, results: T[] }>();

  constructor(
    private basePath: string,
    private crudClient: HttpClient
  ) { }

  byId(id: string): Observable<T> {
    return this.crudClient
      .get<T>(
        `${this.basePath}/${id}`
      );
  }

  getList(currentPage?: number, pageSize?: number) {
    const params = new HttpParams();
    if (currentPage && pageSize) {
      params.set('page', currentPage);
      params.set('pageSize', pageSize);
    }
    this.crudClient
      .get<{ totalResults: number, list: T[] }>(
        `${this.basePath}`,
        {params}
      )
      .subscribe(
        response => {
          this.list = response.list;
          this.listUpdated
            .next({
              results: [...this.list],
              totalResults: response.totalResults
            });
        }
      );
  }

  getListUpdated(): Observable<{ totalResults: number, results: T[] }> {
    return this.listUpdated.asObservable();
  }

  create(body: T): Observable<T> {
    return this.crudClient
      .post<T>(
        `${this.basePath}`,
        body
      );
  }

  updateOne(body: T): Observable<T> {
    return this.crudClient
      .put<T>(
        `${this.basePath}`,
        body
      );
  }

  deleteOne(id: string): Observable<number> {
    return this.crudClient
      .delete<number>(
        `${this.basePath}/${id}`
      );
  }

}
