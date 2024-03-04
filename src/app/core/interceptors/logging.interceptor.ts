import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  return next(req)
    .pipe(
      tap(event => {
        if (event.type === HttpEventType.Response && req.url.includes('api')) {
          console.log(req.method, req.url, req.body || '-', event.body);
        }
      })
    );
}
