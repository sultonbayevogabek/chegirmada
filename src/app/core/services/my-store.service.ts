import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { StoreModel } from '../models/store.model';
import { BranchModel } from '../models/branch.model';

@Injectable()

export class MyStoreService {
  private _host = environment.host;
  private _httpClient = inject(HttpClient);

  checkShortName(shortname: string): Observable<{ shortname: string }> {
    return this._httpClient.post<{ shortname: string }>(this._host + 'stores/check-shortname/', {
      shortname
    });
  }

  registerStore(payload: FormData): Observable<StoreModel> {
    return this._httpClient.post<StoreModel>(this._host + 'stores/', payload);
  }

  getMyStoreData(): Observable<StoreModel> {
    return this._httpClient.get<StoreModel>(this._host + 'stores/my/');
  }

  editStore(payload: FormData): Observable<StoreModel> {
    return this._httpClient.patch<StoreModel>(this._host + 'stores/my/', payload);
  }

  getBranchById(branchId: number): Observable<BranchModel> {
    return this._httpClient.get<BranchModel>(this._host + `stores/branches/${branchId}/`)
      .pipe(catchError(() => of(null)))
  }

  getBranches(storeId: number): Observable<BranchModel[]> {
    return this._httpClient.get<BranchModel[]>(this._host + `stores/${storeId}/branches/`)
  }

  createBranch(payload: BranchModel): Observable<BranchModel> {
    return this._httpClient.post<BranchModel>(this._host + 'stores/branches/create/', payload);
  }

  updateBranch(payload: BranchModel): Observable<BranchModel> {
    return this._httpClient.put<BranchModel>(this._host + `stores/branches/${payload?.pk}/`, payload);
  }

  deleteBranch(branchId: number): Observable<BranchModel> {
    return this._httpClient.delete<BranchModel>(this._host + `stores/branches/${branchId}/`);
  }

  getStoreList(params: { page: number; page_size: number; search: string }): Observable<{ count: number; results: StoreModel[] }> {
    return this._httpClient.get<{ count: number; results: StoreModel[] }>(this._host + 'stores/', {
      params: {
        ...params,
        page: params.page + 1,
      }
    })
  }
}
