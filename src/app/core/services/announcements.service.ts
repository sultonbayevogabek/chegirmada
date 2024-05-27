import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DiscountParamsModel } from '../models/discount-params.model';

@Injectable()

export class AnnouncementsService {
  private _host = environment.host;
  private _httpClient = inject(HttpClient);

  getAnnouncementsList(params: DiscountParamsModel): Observable<any> {
    return this._httpClient.get<any>(this._host + 'discounts/', {
      params: {
        ...params
      }
    });
  }
}
