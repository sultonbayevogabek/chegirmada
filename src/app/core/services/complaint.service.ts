import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class ComplaintService {
  private _host = environment.host;
  private _httpClient = inject(HttpClient);

  sendComplaint(payload: { complaint_type: number; message: string; store?: number }): Observable<any> {
    return this._httpClient.post<any>(this._host + 'complaints/', payload);
  }
}
