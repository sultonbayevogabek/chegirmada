import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RatingStarsComponent } from '../../../shared/components/rating-stars/rating-stars.component';
import { UiButtonComponent } from '../../../shared/components/ui-button/ui-button.component';

@Component({
  selector: 'product-details-seller-info',
  templateUrl: 'product-details-seller-info.component.html',
  styleUrl: 'product-details-seller-info.component.scss',
  imports: [
    MatIconModule,
    RatingStarsComponent,
    UiButtonComponent
  ],
  standalone: true
})

export class ProductDetailsSellerInfoComponent {
}
