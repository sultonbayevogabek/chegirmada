import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserModel } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private _host = environment.host;
  private _httpClient = inject(HttpClient);
  private _router = inject(Router);

  currentUser: UserModel;

  public currentUser$: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(null);

  sendPhoneNumber(phoneNumber: string): Observable<{ code: number }> {
    return this._httpClient.post<{ code: number }>(this._host + 'auth/code/', {
      phone_number: phoneNumber
    });
  }

  sendCode(phoneNumber: string, code: string): Observable<{ token: string }> {
    return this._httpClient.post<{ token: string }>(this._host + 'auth/token/', {
      phone_number: phoneNumber,
      auth_code: code
    });
  }

  getUserByToken(): Observable<UserModel> {
    if (this.currentUser) {
      return of(this.currentUser);
    }

    return this._httpClient.get<UserModel>(this._host + 'users/profile/')
      .pipe(
        switchMap((user: UserModel) => {
          this.currentUser = user;
          this.currentUser$.next(user);
          return of(user);
        }),
        catchError(() => {
          this.currentUser$.next(null);
          return of(null);
        })
      );
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  signOut(): void {
    this.currentUser = null;
    this.currentUser$.next(null);
    localStorage.removeItem('token');
    this._router.navigate(['/']);
  }
}
