import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
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
    MatRipple
  ],
  standalone: true
})

export class CompanyProfileComponent implements OnInit {
  mode: 'static' | 'edit' = 'static';
  tabs = [
    {
      routerLink: [ 'discounts' ],
      text: 'Скидки'
    },
    {
      routerLink: [ 'products' ],
      text: 'Продукты'
    },
    {
      routerLink: [ 'branches' ],
      text: 'Филиали'
    },
    {
      routerLink: [ 'expired-discounts' ],
      text: 'Законченный скидки'
    }
  ];

  private _activatedRoute = inject(ActivatedRoute);
  private _destroyRef = inject(DestroyRef);
  private _authService = inject(AuthService);
  private _dialog = inject(MatDialog);
  private _toaster = inject(ToasterService);

  ngOnInit(): void {
    this._activatedRoute.queryParams
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((queryParams: Params) => {
        if ('mode' in queryParams) {
          this.mode = queryParams['mode'];
        }
      });
  }

  openRateModal(): void {
    if (!this._authService.currentUser) {
      this._toaster.open({
        title: 'attention',
        message: 'you.must.be.authorized.leave.comment',
        type: 'warning'
      });
      return;
    }

    this._dialog.open(CompanyProfileRateComponent, {
      width: '25rem',
      maxWidth: '100%',
      data: {
        name: '"Korzinka" MChJ',
        shortname: '@korzinka',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDUWN4Hx9ybuBWqJkuiE1luauJRdmZqtPsJlAIzTv5ng&s',
        storeId: 3
      }
    });
  }
}
