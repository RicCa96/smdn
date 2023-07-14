import {AuthService} from '../services/auth.service';
import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ErrorComponent} from '../components/error/error.component';
import {DialogService} from "primeng/dynamicdialog";
import {TranslateService} from "@ngx-translate/core";

/**
 * The AuthGuard class is responsible for protecting routes that require authentication.
 * It checks if the user is authenticated before allowing access to the route.
 */
@Injectable()
export class AuthGuard {

  private authService = inject(AuthService);
  private dialogService = inject(DialogService);
  private translateService = inject(TranslateService);

  /**
   * Creates an instance of AuthGuard.
   * @param {Router} router - The Angular router service.
   */
  constructor(
    private router: Router
  ) {
  }

  /**
   * Determines whether the user is authenticated and can access the requested route.
   * If the user is not authenticated, they are redirected to the login page and an error message is displayed.
   * @param {ActivatedRouteSnapshot} route - The activated route snapshot.
   * @param {RouterStateSnapshot} state - The router state snapshot.
   * @returns {(boolean | Observable<boolean> | Promise<boolean>)} - A boolean indicating whether the user is authenticated.
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    // Check if the user is authenticated
    const isAuthenticated = this.authService.getIsAuthenticated();

    // If the user is not authenticated, redirect to the login page and show an error message
    if (!isAuthenticated) {
      this.translateService.get('generic.messages.unauthenticated')
        .subscribe({
          next: res => {
            this.router.navigate(['/auth/login']);
            this.showErrorMessage(res);
          }
        });
    }

    // Return a boolean indicating whether the user is authenticated
    return isAuthenticated;
  }

  /**
   * Displays an error message dialog with the specified message.
   * @param {string} message - The error message to display.
   */
  private showErrorMessage(message: string): void {
    this.dialogService
      .open(
        ErrorComponent,
        {
          data: {
            message: message
          }
        }
      );
  }

}

