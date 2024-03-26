import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Params } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatRipple } from '@angular/material/core';
import { UiButtonComponent } from '../../core/components/ui-button/ui-button.component';
import { YoutubePlayer } from '../../core/components/youtube-player/youtube-player.component';
import { TabsComponent } from '../../core/components/tabs/tabs.component';

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
  mode: 'static' | 'edit' = 'static'
  tabs = [
    {
      routerLink: ['discounts'],
      text: 'Скидки'
    },
    {
      routerLink: ['products'],
      text: 'Продукты'
    },
    {
      routerLink: ['branches'],
      text: 'Филиали'
    },
    {
      routerLink: ['expired-discounts'],
      text: 'Законченный скидки'
    }
  ]

  private _activatedRoute = inject(ActivatedRoute);
  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this._activatedRoute.queryParams
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((queryParams: Params) => {
        if ('mode' in queryParams) {
          this.mode = queryParams['mode'];
        }
      })
  }
}
