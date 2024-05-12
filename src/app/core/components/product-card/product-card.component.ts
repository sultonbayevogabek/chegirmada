import { Component, Input } from '@angular/core';
import { DatePipe, DecimalPipe, NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ProductCard } from '../../models/wishlist.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'product-card',
  templateUrl: 'product-card.component.html',
  styleUrl: 'product-card.component.scss',
  imports: [
    NgOptimizedImage,
    MatIconModule,
    RouterLink,
    DecimalPipe,
    TranslateModule,
    DatePipe
  ],
  standalone: true
})

export class ProductCardComponent {
  @Input({ required: true }) product: ProductCard;

  activeIndex = 0;
}
