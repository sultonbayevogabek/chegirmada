import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductDetailsService } from '../services/product-details.service';
import { ProductDetails } from '../models/product-details.model';
import { inject } from '@angular/core';

export const productDetailsResolver: ResolveFn<Observable<ProductDetails>> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductDetails> => {
  const productDetailsService = inject(ProductDetailsService);
  const id = route.params['id'];
  return productDetailsService.getProductDetails(id)
}

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductDetailsResolver {
//   private _productDetailsService = new ProductDetailsService;
//
//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
//     const id = route.params['id'];
//     return this._productDetailsService.getProductDetails(id);
//   }
// }
