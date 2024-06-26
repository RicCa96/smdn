import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AbstractCrudService} from './abstract-crud.service';

export abstract class AbstractLookupService<T> extends AbstractCrudService<T> {

  constructor(
    lookupServiceBasePath: string,
    lookupClient: HttpClient
  ) {
    super(lookupServiceBasePath, lookupClient);
  }

  lookup(query?: string): Observable<T[]> {
    const params = new HttpParams();
    if (query) {
      params.set('query', query);
    }
    return this.crudClient
      .get<T[]>(
        `${this.basePath}/lookup`,
        {params}
      );
  }

}
