import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { SectionHeaderComponent } from '../../core/components/section-header/section-header.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgOptimizedImage } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MyStoreService } from '../../core/services/my-store.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StoreModel } from '../../core/models/store.model';
import { SpinnerLoaderComponent } from '../../core/components/spinner-loader/spinner-loader.component';
import { ProfileEmptyListComponent } from '../profile/profile-empty-list/profile-empty-list.component';
import { UiButtonComponent } from '../../core/components/ui-button/ui-button.component';
import { FormsModule } from '@angular/forms';
import { UserModel } from '../../core/models/user.model';
import { AuthService } from '../../core/services/auth.service';
import { LoginProfileComponent } from '../../core/components/header/header-middle/login-button/login-profile.component';
import { ProductDetailsService } from '../../core/services/product-details.service';

@Component({
  selector: 'stores-component',
  templateUrl: 'stores.component.html',
  styleUrl: 'stores.component.scss',
  imports: [
    SectionHeaderComponent,
    TranslateModule,
    NgOptimizedImage,
    MatIcon,
    MatPaginator,
    SpinnerLoaderComponent,
    ProfileEmptyListComponent,
    UiButtonComponent,
    FormsModule
  ],
  providers: [
    MyStoreService,
    ProductDetailsService,
    LoginProfileComponent,
  ],
  standalone: true
})

export class StoresComponent implements OnInit {
  params = {
    page: 0,
    page_size: 12,
    total: 0,
    search: ''
  };
  loading = true;
  stores: StoreModel[] = [];

  private _currentUser: UserModel;
  private _myStoreService = inject(MyStoreService);
  private _destroyRef = inject(DestroyRef);
  private _authService = inject(AuthService);
  private _loginProfileComponent = inject(LoginProfileComponent);
  private _productDetailsService = inject(ProductDetailsService);

  ngOnInit(): void {
    this._authService.currentUser$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(user => {
        this._currentUser = user;
      })

    this.getStoresList()
  }


  onPageChange($event: PageEvent): void {
    this.params.page = $event.pageIndex;
    this.getStoresList();
  }

  getStoresList(): void {
    this._myStoreService.getStoreList(this.params)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(res => {
        this.loading = false;
        this.stores = res?.results || [];
        this.params.total = +res?.count
      }, err => {
        this.loading = false;
      })
  }

  search(): void {
    this.params.page = 0;
    this.getStoresList();
  }

  subscribeToStore(store: StoreModel): void {
    if (!this._currentUser) {
      this._loginProfileComponent.openLoginDialog();
      return;
    }

    this._productDetailsService.subscribeStore(store.pk)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: () => {
          store.user_follow = !store.user_follow;

          if (store.user_follow) {
            store.followers = (+store.followers + 1).toString();
          } else {
            store.followers = (+store.followers - 1).toString();
          }
        }
      });
  }
}
