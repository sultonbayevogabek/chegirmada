import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StoreModel } from '../models/store.model';

@Injectable()

export class CompanyProfileService {
  private _host = environment.host;
  private _httpClient = inject(HttpClient);

  rateCompany(payload: { store: number; value: number; comment: string }): Observable<{ store: number; value: number }> {
    return this._httpClient.post<{ store: number; value: number }>(this._host + 'stores/rating/', payload);
  }

  getStoreInfo(id: string): Observable<StoreModel> {
    return this._httpClient.get<StoreModel>(this._host + 'stores/' + id);
  }

  getStoreAnnouncements(params: { store_id: string; page: number; page_size: number }): Observable<any> {
    return this._httpClient.get<any>(this._host + 'stores/' + params.store_id + '/products', {
      params: {
        ...params
      }
    });
  }
}
