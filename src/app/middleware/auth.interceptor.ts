import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';

/**
 * An Angular HttpInterceptor that adds an Authorization header with a Bearer token to
 * outgoing HTTP requests.
 * The token is obtained from the AuthService.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  /**
   * Intercepts an outgoing HTTP request and adds an Authorization header with a Bearer token.
   * @param req - The outgoing HTTP request.
   * @param next - The next HttpHandler in the chain.
   * @returns An Observable of the HTTP response.
   */
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    const authRequest = req.clone({
      headers: req.headers.set(`Authorization`, `Bearer ${authToken}`)
    });
    return next.handle(authRequest);
  }
}
