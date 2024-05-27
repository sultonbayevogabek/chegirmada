import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { SectionHeaderComponent } from '../section-header/section-header.component';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductCard } from '../../models/wishlist.model';
import { AnnouncementsService } from '../../services/announcements.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'products-section',
  templateUrl: 'products-section.component.html',
  styleUrl: 'products-section.component.scss',
  imports: [
    SectionHeaderComponent,
    ProductCardComponent,
  ],
  providers: [
    AnnouncementsService
  ],
  standalone: true
})

export class ProductsSectionComponent implements OnInit {
  @Input() heading?: string;
  @Input() url: string;
  @Input() page: number = 1;

  products: ProductCard[] = [];

  private _announcementsService = inject(AnnouncementsService);
  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this._announcementsService.getAnnouncementsList({
      page: this.page,
      page_size: 8,
    })
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(res => {
        this.products = res.results;
      })
  }
}
