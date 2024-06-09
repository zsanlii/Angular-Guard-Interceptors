import { Inject, Injectable } from '@angular/core';
import { LoginCredentials } from '../models/login-credentials';
import { Observable, tap } from 'rxjs';
import { LoggedUser } from '../models/logged-user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AuthService as CoreAuthService } from '../../../core/auth/services/auth.service';
import { DOCUMENT } from '@angular/common';
import { SecretMessage } from '../models/secret-message';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends CoreAuthService {
  private apiControllerUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, @Inject(DOCUMENT) document: Document) {
    super(document);
  }

  login(loginCredentials: LoginCredentials): Observable<LoggedUser> {
    return this.http
      .post<LoggedUser>(`${this.apiControllerUrl}/login`, loginCredentials)
      .pipe(
        tap((loggedUser) => {
          this.token = loggedUser.access_token;
          this._logged.next();
          this._isLogged.next(true);
        })
      );
  }

  test(): Observable<SecretMessage> {
    return this.http.get<SecretMessage>(`${this.apiControllerUrl}/test`);
  }

  testAdmin(): Observable<SecretMessage> {
    return this.http.get<SecretMessage>(`${this.apiControllerUrl}/test-admin`);
  }
}
