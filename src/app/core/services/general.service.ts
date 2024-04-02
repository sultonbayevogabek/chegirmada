import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';
import { DistrictModel } from '../models/district.model';
import { SecondLevelCategory } from '../models/categories.model';

@Injectable()

export class GeneralService {
  private _host = environment.host;
  private _httpClient = inject(HttpClient);

  getDistrictsByRegionId(regionId: number): Observable<DistrictModel[]> {
    return this._httpClient.get<DistrictModel[]>(this._host + `general/districts/${regionId}/`)
      .pipe(map(res => res || []));
  }

  getSubcategories(mainCategoryId: number): Observable<SecondLevelCategory[]> {
    return this._httpClient.get<SecondLevelCategory[]>(this._host + `general/categories/${mainCategoryId}/`)
  }

  getCategoryFeatures(thirdLevelCategoryId: number): Observable<any> {
    return this._httpClient.get<any>(this._host + `general/categories/${thirdLevelCategoryId}/features/`)
  }
}
