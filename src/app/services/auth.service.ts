import {AUTH_API} from '../shared/constants/backend-routes.constants';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
// CONSTANTS
import {
  LOCAL_STORAGE_AUTH_TOKEN_EXPIRATION_DATE_KEY,
  LOCAL_STORAGE_AUTH_TOKEN_KEY,
  LOCAL_STORAGE_USER_ID_KEY,
  LOCAL_STORAGE_USER_IS_ADMIN_KEY
} from '../shared/constants/local-storage.constants';
// MODELS
import {AuthData} from '../models/auth/auth-data.model';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private token: string | null = null;
  /**
   * Using correct type `NodeJS.Timer` throws a `TS2503: Cannot find namespace 'NodeJS'` error, hence tokenTimer's type is declared as any.
   */
  private tokenTimer: any;
  private userId: string | null = null;
  private userIsAdmin = false;
  private authStatusListener = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
  }

  getToken(): string | null {
    return this.token;
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  isUserAdmin() {
    return this.userIsAdmin;
  }

  getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }

  checkUserExistence(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${AUTH_API}/exists/${username}`);
  }

  signup(username: string, password: string): void {
    const authData: AuthData = {username, password};
    this.http.post<{ message: string, user: User }>(`${AUTH_API}/signup`, authData)
      .subscribe({
        next: response => {
          console.log(`${AUTH_API}/signup responded:`, response);
          this.router.navigate(['/']);
        },
        error: () => {
          this.authStatusListener.next(false);
        }
      });
  }

  login(username: string, password: string): void {
    const authData: AuthData = {username, password};
    this.http
      .post<{ token: string, expiresIn: number, userId: string, is_admin: boolean }>(`${AUTH_API}/login`, authData)
      .subscribe({
        next: response => {
          console.log(`${AUTH_API}/login responded:`, response);
          const t = response.token;
          this.token = t;
          if (t) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.userIsAdmin = response.is_admin;
            this.authStatusListener.next(true);
            const expirationDateTimestamp = new Date().getTime() + expiresInDuration * 1000;
            this.saveAuthData(t, new Date(expirationDateTimestamp), this.userId, this.userIsAdmin);
            this.router.navigate(['/']);
          }
        },
        error: () => {
          this.authStatusListener.next(false);
        }
      });
  }

  automaticLoginUser(): void {
    const authInformation = this.getAuthData();
    if (authInformation) {
      const now = new Date();
      const authenticationExpiresIn = authInformation.authTokenExpirationDate.getTime() - now.getTime();
      if (authenticationExpiresIn > 0) {
        this.setAuthTimer(authenticationExpiresIn / 1000);
        this.token = authInformation.authToken;
        this.isAuthenticated = true;
        this.userId = authInformation.userId;
        this.userIsAdmin = authInformation.userIsAdmin;
        this.authStatusListener.next(true);
      } else {
        console.log(`Your authentication token is expired. Login to get a new one.`);
      }
    }
  }

  logout(): void {
    this.token = null;
    this.isAuthenticated = false;
    this.userId = null;
    this.userIsAdmin = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthTimer(durationInSeconds: number) {
    console.log(`Setting timer of ${durationInSeconds} seconds`);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, durationInSeconds * 1000);
  }

  private saveAuthData(authToken: string, authTokenExpirationDate: Date, userId: string, userIsAdmin: boolean) {
    localStorage.setItem(LOCAL_STORAGE_AUTH_TOKEN_KEY, authToken);
    localStorage.setItem(LOCAL_STORAGE_AUTH_TOKEN_EXPIRATION_DATE_KEY, authTokenExpirationDate.toISOString());
    localStorage.setItem(LOCAL_STORAGE_USER_ID_KEY, userId);
    localStorage.setItem(LOCAL_STORAGE_USER_IS_ADMIN_KEY, JSON.stringify(userIsAdmin));
  }

  private clearAuthData() {
    localStorage.removeItem(LOCAL_STORAGE_AUTH_TOKEN_KEY);
    localStorage.removeItem(LOCAL_STORAGE_AUTH_TOKEN_EXPIRATION_DATE_KEY);
    localStorage.removeItem(LOCAL_STORAGE_USER_ID_KEY);
    localStorage.removeItem(LOCAL_STORAGE_USER_IS_ADMIN_KEY);
  }

  private getAuthData(): {authToken: string, authTokenExpirationDate: Date, userId: string | null, userIsAdmin: boolean} | undefined {
    const authToken = localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN_KEY);
    const authTokenExpirationDate = localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN_EXPIRATION_DATE_KEY);
    const userId = localStorage.getItem(LOCAL_STORAGE_USER_ID_KEY);
    const userIsAdmin = localStorage.getItem(LOCAL_STORAGE_USER_IS_ADMIN_KEY);
    if (!authToken || !authTokenExpirationDate) {
      return;
    }
    return {
      authToken,
      authTokenExpirationDate: new Date(authTokenExpirationDate),
      userId,
      userIsAdmin: userIsAdmin ? JSON.parse(userIsAdmin) : false
    };
  }
}
