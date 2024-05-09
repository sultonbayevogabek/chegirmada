import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { PaymentHistoryResponse } from '../models/payment-history.model';

@Injectable()

export class BalanceService {

  private _host = environment.host;
  private _httpClient = inject(HttpClient);

  getPaymentHistory(params: { page: number; page_size: number }): Observable<PaymentHistoryResponse> {
    const options = new HttpParams().set('page', params.page + 1).set('page_size', params.page_size);
    return this._httpClient.get<PaymentHistoryResponse>(this._host + 'payments/history', { params: options });
  }
}
