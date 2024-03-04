import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

export function errorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  return next(req)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('Error => ', req.url, error.error.error);
        return throwError(() => error.error.error);
      })
    );
}
