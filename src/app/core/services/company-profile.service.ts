import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class CompanyProfileService {
  private _host = environment.host;
  private _httpClient = inject(HttpClient);

  rateCompany(payload: { store: number; value: number; comment: string }): Observable<{ store: number; value: number }> {
    return this._httpClient.post<{ store: number; value: number }>(this._host + 'stores/rating/', payload);
  }
}
