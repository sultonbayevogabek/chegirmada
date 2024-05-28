import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { DatePipe, DecimalPipe, LowerCasePipe, NgOptimizedImage, NgStyle } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Params } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatRipple } from '@angular/material/core';
import { UiButtonComponent } from '../../core/components/ui-button/ui-button.component';
import { YoutubePlayer } from '../../core/components/youtube-player/youtube-player.component';
import { TabsComponent } from '../../core/components/tabs/tabs.component';
import { CompanyProfileRateComponent } from './company-profile-rate/company-profile-rate.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../core/services/auth.service';
import { ToasterService } from '../../core/services/toaster.service';
import { CompanyProfileService } from '../../core/services/company-profile.service';
import { filter, map, tap } from 'rxjs';
import { StoreModel } from '../../core/models/store.model';
import { TranslateModule } from '@ngx-translate/core';
import { PhoneNumberPipe } from '../../core/pipes/phone-number.pipe';
import { WEEKDAYS } from '../../core/constants/weekdays';
import { UserModel } from '../../core/models/user.model';
import { LoginProfileComponent } from '../../core/components/header/header-middle/login-button/login-profile.component';
import { ProductDetailsService } from '../../core/services/product-details.service';
import { SpinnerLoaderComponent } from '../../core/components/spinner-loader/spinner-loader.component';

@Component({
  selector: 'company-profile',
  templateUrl: 'company-profile.component.html',
  styleUrl: 'company-profile.component.scss',
  imports: [
    NgOptimizedImage,
    MatIcon,
    UiButtonComponent,
    YoutubePlayer,
    TabsComponent,
    MatRipple,
    TranslateModule,
    LowerCasePipe,
    PhoneNumberPipe,
    DatePipe,
    DecimalPipe,
    NgStyle,
    SpinnerLoaderComponent
  ],
  providers: [
    CompanyProfileService,
    LoginProfileComponent,
    ProductDetailsService
  ],
  standalone: true
})

export class CompanyProfileComponent implements OnInit {
  tabs = [
    {
      routerLink: [ 'products' ],
      text: 'announcements'
    },
    {
      routerLink: [ 'branches' ],
      text: 'branches'
    }
  ];
  store: StoreModel;
  weekdays = WEEKDAYS;

  private _currentUser: UserModel;
  private _activatedRoute = inject(ActivatedRoute);
  private _destroyRef = inject(DestroyRef);
  private _authService = inject(AuthService);
  private _dialog = inject(MatDialog);
  private _toaster = inject(ToasterService);
  private _companyProfileService = inject(CompanyProfileService);
  private _loginProfileComponent = inject(LoginProfileComponent);
  private _productDetailsService = inject(ProductDetailsService);

  ngOnInit(): void {
    this._activatedRoute.params
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((params: { storeId: string }) => {
        if (!params?.storeId) return;

        this.getStoreInfo(params?.storeId)
      })

    this._authService.currentUser$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(user => {
        this._currentUser = user;
      })
  }

  openRateModal(): void {
    if (!this._currentUser) {
      this._loginProfileComponent.openLoginDialog();
      return;
    }

    this._dialog.open(CompanyProfileRateComponent, {
      width: '25rem',
      maxWidth: '100%',
      data: {
        name: this.store.name,
        shortname: this.store.shortname,
        logo: this.store.logo,
        storeId: this.store.pk
      }
    });
  }

  getStoreInfo(storeId: string): void {
    this._companyProfileService.getStoreInfo(storeId)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(res => {
        this.store = res;
        this.store.total_ratings_count = +res.rating1 + +res.rating2 + +res.rating3 + +res.rating4 + +res.rating5;
      })
  }

  subscribeToStore() {
    if (!this._currentUser) {
      this._loginProfileComponent.openLoginDialog();
      return;
    }

    this._productDetailsService.subscribeStore(this.store.pk)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: () => {
          this.store.user_follow = !this.store.user_follow;

          if (this.store.user_follow) {
            this.store.followers = (+this.store.followers + 1).toString();
          } else {
            this.store.followers = (+this.store.followers - 1).toString();
          }
        }
      });
  }
}
