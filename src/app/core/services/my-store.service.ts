import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { StoreModel } from '../models/store.model';

@Injectable()

export class MyStoreService {
  private _host = environment.host;
  private _httpClient = inject(HttpClient);

  checkShortName(shortname: string): Observable<{ shortname: string }> {
    return this._httpClient.post<{ shortname: string }>(this._host + 'stores/check-shortname/', {
      shortname
    });
  }

  registerStore(payload: FormData): Observable<StoreModel> {
    return this._httpClient.post<StoreModel>(this._host + 'stores/', payload);
  }

  getMyStoreData(): Observable<StoreModel> {
    return this._httpClient.get<StoreModel>(this._host + 'stores/my/');
  }

  editStore(payload: FormData): Observable<StoreModel> {
    return this._httpClient.patch<StoreModel>(this._host + 'stores/my/', payload);
  }

  getBranches(storeId: number): Observable<any> {
    return this._httpClient.get<any>(this._host + `stores/branches/${storeId}/`)
      .pipe(catchError(() => of([])))
  }
}
