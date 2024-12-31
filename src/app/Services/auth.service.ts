import { Injectable } from '@angular/core';
import { ILoginBody } from '../Models/ILoginBody';
import { HttpClient } from '@angular/common/http';
import { ISignupBody } from '../Models/ISignupBody';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUserProfile } from '../Models/IUserProfile';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$: any = new BehaviorSubject(null);
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  isLoggedIn(): boolean {
    return this.cookieService.check('token');
  }

  getLoggedInUser(): Observable<IUserProfile> {
    return this.http.get<IUserProfile>(
      `${environment.apiUrl}` + 'profile/view',
      {
        withCredentials: true,
      }
    );
  }

  setUser(user: any) {
    this.user$.next(user);
  }

  getUser() {
    return this.user$;
  }

  login(body: ILoginBody) {
    return this.http.post(`${environment.apiUrl}` + 'login', body, {
      withCredentials: true,
    });
  }

  signup(body: ISignupBody) {
    return this.http.post(`${environment.apiUrl}` + 'signup', body);
  }

  logout() {
    return this.http
      .post(`${environment.apiUrl}` + 'logout', '', { withCredentials: true })
      .pipe(
        tap(() => {
          this.cookieService.delete('token');
        })
      );
  }
}
