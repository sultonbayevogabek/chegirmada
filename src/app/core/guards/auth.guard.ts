import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { of, switchMap } from 'rxjs';

export const authGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.token) {
    router.navigate([ 'not-found-404' ]).then();
    return of(false);
  }

  return authService.getUserByToken()
    .pipe(switchMap(user => {
        if (!user) {
          return of(false);
        }

        return of(true);
      })
    );
};
