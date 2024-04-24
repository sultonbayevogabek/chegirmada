import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductDetails } from '../models/product-details.model';

@Injectable()

export class ProductDetailsService {
  private _host = environment.host;
  private _httpClient = inject(HttpClient);

  getProductDetails(id: string): Observable<ProductDetails> {
    return this._httpClient.get<ProductDetails>(this._host + 'discounts/' + id);
  }

  likeProduct(id: number): Observable<{ discount: number }> {
    return this._httpClient.post<{ discount: number }>(this._host + 'discounts/like/', {
      discount: id,
    });
  }

  dislikeProduct(id: number): Observable<{ discount: number }> {
    return this._httpClient.post<{ discount: number }>(this._host + 'discounts/dislike/', {
      discount: id,
    });
  }
}
