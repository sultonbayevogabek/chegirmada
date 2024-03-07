import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { map, Observable, tap } from 'rxjs';
import { DistrictModel } from '../models/district.model';

@Injectable()

export class MyInformationService {
  private _host = environment.host;
  private _httpClient = inject(HttpClient);

  updateUserInformation(payload: UserModel): Observable<UserModel> {
    return this._httpClient.put<UserModel>(this._host + 'users/profile/', payload);
  }

  getDistrictsByRegionId(regionId: number): Observable<DistrictModel[]> {
    return this._httpClient.post<{ districts: DistrictModel[] }>(this._host + 'general/districts/', {
      region: regionId
    }).pipe(map(res => res.districts || []));
  }
}
