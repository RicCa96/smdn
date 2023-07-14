import {ErrorComponent} from '../components/error/error.component';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from "rxjs";
import {DialogService} from "primeng/dynamicdialog";

/**
 * Interceptor that catches HTTP errors and displays them in a dialog box.
 * @class
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  /**
   * Creates an instance of ErrorInterceptor.
   * @param {DialogService} dialogService - The service used to display the error dialog box.
   */
  constructor(
    private dialogService: DialogService,
  ) {
  }

  /**
   * Intercepts HTTP requests and handles errors.
   * @param {HttpRequest<any>} req - The HTTP request to handle.
   * @param {HttpHandler} next - The next handler in the chain.
   * @returns {Observable<HttpEvent<any>>} An observable that emits the HTTP response or an error.
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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
