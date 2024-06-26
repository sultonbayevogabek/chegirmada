import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { PaymentHistoryResponse } from '../models/payment-history.model';
import { PackagesResponse, PackageTypesResponse } from '../models/package.model';

@Injectable()

export class PackagesService {
  private _host = environment.host;
  private _httpClient = inject(HttpClient);

  getPackagesList(params: { page: number; page_size: number }): Observable<PackagesResponse> {
    const options = new HttpParams().set('page', params.page + 1).set('page_size', params.page_size);
    return this._httpClient.get<PackagesResponse>(this._host + 'stores/my/tariffs/', { params: options });
  }

  getPackageTypes(): Observable<PackageTypesResponse> {
    return this._httpClient.get<PackageTypesResponse>(this._host + 'tariffs/');
  }

  buyPackage(tariff: number, quantity: number): Observable<{ tariff: number; quantity: number }> {
    return this._httpClient.post<{ tariff: number; quantity: number }>(this._host + 'tariffs/buy/', {
      tariff, quantity
    });
  }
}
