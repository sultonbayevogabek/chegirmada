import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class RegisterStoreService {
  private _host = environment.host;
  private _httpClient = inject(HttpClient);

  checkShortName(shortname: string): Observable<{ shortname: string }> {
    return this._httpClient.post<{ shortname: string }>(this._host + 'stores/check-shortname/', {
      shortname
    });
  }
}
