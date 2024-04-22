import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductDetailsService } from '../services/product-details.service';
import { ProductDetails } from '../models/product-details.model';

export const productDetailsResolver: ResolveFn<Observable<ProductDetails>> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductDetails> => {
  const productDetailsService = new ProductDetailsService;
  const id = route.params['id'];
  return productDetailsService.getProductDetails(id);
}
