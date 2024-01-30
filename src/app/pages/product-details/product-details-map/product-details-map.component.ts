import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RatingStarsComponent } from '../../../shared/components/rating-stars/rating-stars.component';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';

@Component({
  selector: 'product-details-map',
  templateUrl: 'product-details-map.component.html',
  styleUrl: 'product-details-map.component.scss',
  imports: [
    MatIconModule,
    RatingStarsComponent,
    SectionHeaderComponent
  ],
  standalone: true
})

export class ProductDetailsMapComponent {
}
