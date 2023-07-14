import {inject, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthGuard} from './auth.guard';
import {AuthService} from '../services/auth.service';
import {DialogService} from 'primeng/dynamicdialog';
import {ErrorComponent} from '../components/error/error.component';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {of} from 'rxjs';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;
  let dialogService: DialogService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        AuthGuard,
        AuthService,
        DialogService,
        {
          provide: RouterStateSnapshot,
          useValue: {url: '/test'}
        }
      ]
    });
  });

  beforeEach(inject([AuthGuard, AuthService, DialogService, Router], (_authGuard: AuthGuard, _authService: AuthService, _dialogService: DialogService, _router: Router) => {
    authGuard = _authGuard;
    authService = _authService;
    dialogService = _dialogService;
    router = _router;
  }));

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow access if user is authenticated', () => {
    spyOn(authService, 'getIsAuthenticated').and.returnValue(true);
    const canActivate = authGuard.canActivate(new ActivatedRouteSnapshot(), {url: '/test'} as RouterStateSnapshot);
    expect(canActivate).toBe(true);
  });

  it('should redirect to login page and show error message if user is not authenticated', () => {
    spyOn(authService, 'getIsAuthenticated').and.returnValue(false);
    spyOn(router, 'navigate');
    spyOn(dialogService, 'open').and.returnValue({afterClosed: () => of(true)} as any);
    const canActivate = authGuard.canActivate(new ActivatedRouteSnapshot(), {url: '/test'} as RouterStateSnapshot);
    expect(canActivate).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
    expect(dialogService.open).toHaveBeenCalledWith(ErrorComponent, {data: {message: 'You must login to access the required functionality.'}});
  });
});
