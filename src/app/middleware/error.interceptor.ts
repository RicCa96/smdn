import {ErrorComponent} from '../components/error/error.component';
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {throwError} from "rxjs";
import {DialogService} from "primeng/dynamicdialog";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private dialogService: DialogService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next
      .handle(req)
      .pipe(
        catchError(
          (error: HttpErrorResponse) => {
            console.error(`${req.url} error:`, error);
            const errorMessage = error.error.message ? error.error.message : 'Errore generico';
            this.dialogService
              .open(
                ErrorComponent,
                {
                  data: {
                    message: errorMessage
                  }
                }
              );
            return throwError(() => error);
          }
        )
      );
  }
}
