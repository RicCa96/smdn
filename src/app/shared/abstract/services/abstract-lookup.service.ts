import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbstractCrudService } from './abstract-crud.service';

export abstract class AbstractLookupService<T> extends AbstractCrudService<T> {

  constructor(
    private lookupServiceBasePath: string,
    private lookupClient: HttpClient
  ) {
    super(lookupServiceBasePath, lookupClient);
  }

  lookup(query: string): Observable<T[]> {
    return this.lookupClient
      .get<T[]>(
        `${this.lookupServiceBasePath}/lookup?query=${query}`
      );
  }

}
