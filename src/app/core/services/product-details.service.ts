import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of, switchMap, tap } from 'rxjs';
import { ProductDetails } from '../models/product-details.model';
import { CommentModel } from '../models/comment.model';

@Injectable()

export class ProductDetailsService {
  private _host = environment.host;
  private _httpClient = inject(HttpClient);

  productDetails$: BehaviorSubject<ProductDetails> = new BehaviorSubject<ProductDetails>(null);

  getProductDetails(id: number): Observable<ProductDetails> {
    return this._httpClient.get<ProductDetails>(this._host + 'discounts/' + id)
      .pipe(
        tap(productDetails => {
          this.productDetails$.next(productDetails);
        }),
        switchMap(productDetails => of(productDetails))
      )
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

  deleteComment(id: number): Observable<any> {
    return this._httpClient.delete<any>(this._host + `discounts/comments/${id}/`)
  }
}
