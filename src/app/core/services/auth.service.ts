import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()

export class AuthService {
  private _httpClient = inject(HttpClient);
  private _host = environment.host;
  sendPhoneNumber(phoneNumber: string): Observable<{ success: boolean }> {
    return this._httpClient.post<{ success: boolean }>(this._host + 'auth/code/', {
      phone_number: phoneNumber
    })
  }
}
