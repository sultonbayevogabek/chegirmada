import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule, MatOption, MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../../core/components/product-card/product-card.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DiscountParamsModel } from '../../../core/models/discount-params.model';
import { AnnouncementsService } from '../../../core/services/announcements.service';
import { ProductCard } from '../../../core/models/wishlist.model';
import { TranslateModule } from '@ngx-translate/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'category-products-list',
  templateUrl: 'category-products-list.component.html',
  styleUrl: 'category-products-list.component.scss',
  imports: [
    MatExpansionModule,
    MatIconModule,
    MatRippleModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule, FormsModule, ProductCardComponent, MatSelect, MatOption, RouterLink, MatPaginator, TranslateModule
  ],
  standalone: true,
  providers: [
    AnnouncementsService
  ]
})

export class CategoryProductsListComponent implements OnInit {
  filter = {
    startDate: new Date(),
    endDate: null,
    ordering: 'likes'
  };

  ordering = [
    {
      value: '-likes',
      label: 'popular'
    },
    {
      value: 'price',
      label: 'cheaper'
    },
    {
      value: '-price',
      label: 'more.expensive'
    },
    {
      value: '-created_at',
      label: 'new.ones'
    }
  ];

  products: ProductCard[] = [];
  params: DiscountParamsModel;

  private _activatedRoute = inject(ActivatedRoute);
  private _announcementsService = inject(AnnouncementsService);
  private _router = inject(Router);
  private _destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.getParamsFromUrl();
  }

  getAnnouncements(): void {
    this._announcementsService.getAnnouncementsList(this.params)
      .subscribe(res => {
        this.products = res.results;
        this.params.total = +res?.count;
      });
  }

  getParamsFromUrl(): void {
    this._activatedRoute.queryParams
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((params: DiscountParamsModel) => {
        this.params = {
          ...params,
          page: +params.page || 1,
          page_size: +params.page_size || 12
        };

        if (params?.start_date__lte) {
          this.filter.startDate = new Date(params?.start_date__lte);
        } else {
          this.filter.startDate = new Date();
        }

        if (params?.end_date__gte) {
          this.filter.endDate = new Date(params?.end_date__gte);
        } else {
          this.filter.endDate = null;
        }

        if (['-likes', 'price', '-price', 'created_at'].includes(params?.ordering)) {
          this.filter.ordering = params?.ordering;
        } else {
          this.filter.ordering = '-likes';
        }

        this.getAnnouncements();
      });
  }

  setParamsToUrl(): void {
    delete this.params?.total;

    this._router.navigate(
      [],
      {
        relativeTo: this._activatedRoute,
        queryParams: this.params,
        queryParamsHandling: 'merge'
      }
    );
  }

  changePage($event: PageEvent): void {
    this.params.page = $event.pageIndex + 1;
    this.setParamsToUrl();
  }

  dateRangeChange(): void {
    this.params.page = 1;

    if (this.filter.startDate) {
      this.params.start_date__lte = formatDate(this.filter.startDate, 'yyyy-MM-dd', 'ru');
    }

    if (this.filter.endDate) {
      this.params.end_date__gte = formatDate(this.filter.endDate, 'yyyy-MM-dd', 'ru');
    }

    this.setParamsToUrl();
  }

  order(): void {
    this.params.page = 1;
    this.params.ordering = this.filter.ordering;
    this.setParamsToUrl();
  }
}
