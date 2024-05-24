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
import { PRODUCTS } from '../../../core/constants/products';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DiscountParamsModel } from '../../../core/models/discount-params.model';
import { AnnouncementsService } from '../../../core/services/announcements.service';
import { ProductCard } from '../../../core/models/wishlist.model';

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
    MatNativeDateModule, FormsModule, ProductCardComponent, MatSelect, MatOption, RouterLink, MatPaginator
  ],
  standalone: true,
  providers: [
    AnnouncementsService
  ]
})

export class CategoryProductsListComponent implements OnInit {
  startDate = new Date();
  endDate = new Date();

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
    this._announcementsService.getWishlist(this.params)
      .subscribe(res => {
        this.products = res.data;
      })
  }

  getParamsFromUrl(): void {
    this._activatedRoute.queryParams
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((params: DiscountParamsModel) => {
        this.params = {
          ...params,
          page: +params.page || 1,
          page_size: +params.page_size || 20
        };

        this.getAnnouncements()
      })
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
    )
  }

  changePage($event: PageEvent): void {
    this.params.page = $event.pageIndex + 1;
    this.setParamsToUrl();
  }
}
