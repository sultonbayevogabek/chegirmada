import { Component, Input } from '@angular/core';
import { SectionHeaderComponent } from '../section-header/section-header.component';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductCard } from '../../models/wishlist.model';

@Component({
  selector: 'products-section',
  templateUrl: 'products-section.component.html',
  styleUrl: 'products-section.component.scss',
  imports: [
    SectionHeaderComponent,
    ProductCardComponent
  ],
  standalone: true
})

export class ProductsSectionComponent {
  @Input({ required: true }) heading: string;
  @Input() url: string;
  @Input() products: ProductCard[] = []
}
