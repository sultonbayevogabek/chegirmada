import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { TagModel } from '../models/tag.model';

@Injectable()

export class MyAnnouncementsService {
  private _host = environment.host;
  private _httpClient = inject(HttpClient);

  getTags(search: string): Observable<{ search: string; tags: TagModel[] }> {
    return this._httpClient.post<{
      search: string;
      tags: TagModel[]
    }>(this._host + 'tags/search/', { search });
  }
}
