import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { DiscountUpdateData } from '../models/discount-update-data.model';
import { MyAnnouncementsService } from '../services/my-announcements.service';

export const discountUpdateDataResolver: ResolveFn<Observable<DiscountUpdateData>> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DiscountUpdateData> => {
  const myAnnouncementsService = inject(MyAnnouncementsService);
  const id = route.params['id'];
  return myAnnouncementsService.getDiscountDataForEditing(id)
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
