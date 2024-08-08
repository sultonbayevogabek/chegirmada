import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { DecimalPipe, NgOptimizedImage } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { UiButtonComponent } from '../../../core/components/ui-button/ui-button.component';
import { ProductCardComponent } from '../../../core/components/product-card/product-card.component';
import { ActivatedRoute, Params } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CompanyProfileService } from '../../../core/services/company-profile.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AnnouncementsService } from '../../../core/services/announcements.service';
import { ProductCard } from '../../../core/models/wishlist.model';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SpinnerLoaderComponent } from '../../../core/components/spinner-loader/spinner-loader.component';
import { ProfileEmptyListComponent } from '../../profile/profile-empty-list/profile-empty-list.component';

@Component({
  selector: 'company-profile-discounts',
  templateUrl: 'company-profile-discounts.component.html',
  styleUrl: 'company-profile-discounts.component.scss',
  imports: [
    NgOptimizedImage,
    UiButtonComponent,
    MatIcon,
    ProductCardComponent,
    MatPaginator,
    TranslateModule,
    DecimalPipe,
    FormsModule,
    SpinnerLoaderComponent,
    ProfileEmptyListComponent
  ],
  providers: [
    AnnouncementsService
  ],
  standalone: true
})

export class CompanyProfileDiscountsComponent implements OnInit {
  params = {
    page: 0,
    page_size: 4,
    total: 0,
    store__in: null,
    search: ''
  }
  loading = true;

  announcements: ProductCard[] = [];

  private _activatedRoute = inject(ActivatedRoute);
  private _destroyRef = inject(DestroyRef);
  private _announcementsService = inject(AnnouncementsService);

  ngOnInit(): void {
    this._activatedRoute.parent.params.subscribe((params: Params) => {
      if (!params['storeId']) return;

      this.params.store__in = params['storeId'];
      this.getAnnouncements();
    });
  }

  getAnnouncements(): void {
    this._announcementsService.getAnnouncementsList({
      ...this.params,
      page: this.params.page + 1,
    })
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(res => {
        this.loading = false;
        this.announcements = res?.results;
        this.params.total = res?.count;
      })
  }

  pageChange($event: PageEvent): void {
    this.params.page = $event.pageIndex;
    this.getAnnouncements();
  }

  search() {
    this.params.page = 0;
    this.getAnnouncements();
  }
}
