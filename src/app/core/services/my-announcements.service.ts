import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of, switchMap, tap } from 'rxjs';
import { TagModel } from '../models/tag.model';
import { PaymentHistoryResponse } from '../models/payment-history.model';
import { AnnouncementResponse } from '../models/announcement.model';
import { AdvertisingTypeModel } from '../models/advertising-type.model';
import { DiscountUpdateData } from '../models/discount-update-data.model';
import { ProductDetails } from '../models/product-details.model';

@Injectable()

export class MyAnnouncementsService {
  private _host = environment.host;
  private _httpClient = inject(HttpClient);
  discountDataForEditing$: BehaviorSubject<DiscountUpdateData> = new BehaviorSubject<DiscountUpdateData>(null);

  getTags(search: string): Observable<{ search: string; tags: TagModel[] }> {
    return this._httpClient.post<{
      search: string;
      tags: TagModel[]
    }>(this._host + 'tags/search/', { search });
  }

  createStandardDiscount(payload: FormData): Observable<any> {
    return this._httpClient.post<Observable<any>>(this._host + 'discounts/create/standard/', payload);
  }

  getDiscountDataForEditing(id: number): Observable<DiscountUpdateData> {
    return this._httpClient.get<DiscountUpdateData>(this._host + `discounts/${id}/update/`)
      .pipe(
        tap(productDetails => {
          this.discountDataForEditing$.next(productDetails);
        }),
        switchMap(productDetails => of(productDetails))
      );
  }

  getMyAnnouncements(params: {
    page: number;
    page_size: number;
    search: string;
    is_active?: boolean;
    status?: number;
  }): Observable<AnnouncementResponse> {
    let options = new HttpParams()
      .set('page', params.page + 1)
      .set('page_size', params.page_size)
      .set('search', params.search);

    if ('is_active' in params) {
      options.append('status', params.is_active);
    }

    if ('status' in params) {
      options.append('status', params.status);
    }

    return this._httpClient.get<AnnouncementResponse>(this._host + 'discounts/my/', {
      params: {
        ...params,
        page: params.page + 1
      }
    });
  }

  deleteAnnouncement(id: number): Observable<any> {
    return this._httpClient.delete(this._host + `discounts/${id}/update/`)
  }

  getAdvertisingTypes(): Observable<AdvertisingTypeModel[]> {
    return this._httpClient.get<AdvertisingTypeModel[]>(this._host + `discounts/advertising/`)
  }

  buyAdvertising(params: { discount: number; advertisement: number }): Observable<{ discount: number; advertisement: number }> {
    return this._httpClient.post<{ discount: number; advertisement: number }>(this._host + 'discounts/advertising/buy/', params)
  }

  updateStandardDiscount(id: number, payload: FormData): Observable<any> {
    return this._httpClient.put<Observable<any>>(this._host + `discounts/${id}/update/`, payload);
  }
}
