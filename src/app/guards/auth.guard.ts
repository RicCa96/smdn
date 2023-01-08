import {AuthService} from '../services/auth.service';
import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ErrorComponent} from '../components/error/error.component';
import {DialogService} from "primeng/dynamicdialog";

@Injectable()
export class AuthGuard implements CanActivate {

  private authService = inject(AuthService);
  private dialogService = inject(DialogService)

  constructor(
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isAuthenticated = this.authService.getIsAuthenticated();
    if (!isAuthenticated) {
      this.router.navigate(['/auth/login']);
      this.dialogService
        .open(
          ErrorComponent,
          {
            data: {
              message: 'You must login to access the required functionality.'
            }
          }
        );
    }
    return isAuthenticated;
  }

}

