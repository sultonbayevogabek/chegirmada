import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of, switchMap, tap } from 'rxjs';
import { ProductDetails } from '../models/product-details.model';
import { CommentModel } from '../models/comment.model';
import { ProductCard, WishlistResponse } from '../models/wishlist.model';
import { PaymentHistoryResponse } from '../models/payment-history.model';

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
      );
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

  deleteComment(id: number): Observable<void> {
    return this._httpClient.delete<void>(this._host + `discounts/comments/${ id }/`);
  }

  subscribeStore(store: number): Observable<any> {
    return this._httpClient.post<any>(this._host + 'stores/following/', { store });
  }

  toggleWishlist(discount: number): Observable<{ discount: number }> {
    return this._httpClient.post<{ discount: number }>(this._host + 'discounts/wishlist/', { discount });
  }

  getWishlist(params: { page: number; page_size: number }): Observable<WishlistResponse> {
    const options = new HttpParams().set('page', params.page + 1).set('page_size', params.page_size);
    return this._httpClient.get<WishlistResponse>(this._host + 'wishlists/', { params: options });
  }

  getSimilarDiscountsList(params: { page: number; page_size: number; id: number }): Observable<{ count: number; results: ProductCard[] }> {
    const options = new HttpParams().set('page', params.page + 1).set('page_size', params.page_size);
    return this._httpClient.get<{ count: number; results: ProductCard[] }>(this._host + `discounts/${params?.id}/similar/`, { params: options });
  }
}
