import {Directive, inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../services/auth.service';
import {TranslateService} from "@ngx-translate/core";

@Directive()
export abstract class AbstractComponent implements OnInit, OnDestroy {

  // Injections
  protected authService = inject(AuthService);
  protected translateService = inject(TranslateService);

  // Subscriptions
  private authStatusSubscription: Subscription;

  loading = false;
  userIsAuthenticated = false;
  userIsAdmin = false;
  userId: string | null;

  protected constructor() {
    this.userIsAuthenticated = this.authService.getIsAuthenticated();
    this.userId = this.authService.getUserId();
    this.userIsAdmin = this.authService.isUserAdmin();
    this.authStatusSubscription = this.authService
      .getAuthStatusListener()
      .subscribe({
        next: isAuthenticated => {
          this.userIsAuthenticated = isAuthenticated;
          this.userIsAdmin = this.authService.isUserAdmin();
          this.userId = this.authService.getUserId();
        }
      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe();
  }
}
