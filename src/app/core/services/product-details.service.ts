import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductDetails } from '../models/product-details.model';
import { CommentModel } from '../models/comment.model';

@Injectable()

export class ProductDetailsService {
  private _host = environment.host;
  private _httpClient = inject(HttpClient);

  getProductDetails(id: string): Observable<ProductDetails> {
    return this._httpClient.get<ProductDetails>(this._host + 'discounts/' + id);
  }

  likeProduct(id: number): Observable<{ discount: number }> {
    return this._httpClient.post<{ discount: number }>(this._host + 'discounts/like/', {
      discount: id
    });
  }

  dislikeProduct(id: number): Observable<{ discount: number }> {
    return this._httpClient.post<{ discount: number }>(this._host + 'discounts/dislike/', {
      discount: id
    });
  }

  getComments(id: number): Observable<{ count: number; next: any; previous: any; results: CommentModel[] }> {
    return this._httpClient.get<{
      count: number;
      next: any;
      previous: any;
      results: CommentModel[]
    }>(this._host + `discounts/${ id }/comments/`);
  }

  leaveComment(id: number, text: string): Observable<{
    pk: number
    user: number
    created_at: string
    text: string
    is_deleted: boolean
    children_exist: boolean
  }> {
    return this._httpClient.post<{
      pk: number
      user: number
      created_at: string
      text: string
      is_deleted: boolean
      children_exist: boolean
    }>(this._host + `discounts/${ id }/comments/`, { text });
  }
}
