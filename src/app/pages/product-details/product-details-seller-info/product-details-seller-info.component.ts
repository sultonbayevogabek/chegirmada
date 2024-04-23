import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RatingStarsComponent } from '../../../core/components/rating-stars/rating-stars.component';
import { UiButtonComponent } from '../../../core/components/ui-button/ui-button.component';
import { Store } from '../../../core/models/product-details.model';
import { TitleCasePipe } from '@angular/common';
import { ImgWrapperComponent } from '../../../core/components/img-wrapper/img-wrapper.component';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { AverageRatePipe } from '../../../core/pipes/average-rate.pipe';
import { PhoneNumberPipe } from '../../../core/pipes/phone-number.pipe';

@Component({
  selector: 'product-details-seller-info',
  templateUrl: 'product-details-seller-info.component.html',
  styleUrl: 'product-details-seller-info.component.scss',
  imports: [
    MatIconModule,
    RatingStarsComponent,
    UiButtonComponent,
    TitleCasePipe,
    ImgWrapperComponent,
    MatTooltip,
    TranslateModule,
    AverageRatePipe,
    PhoneNumberPipe
  ],
  standalone: true
})

export class ProductDetailsSellerInfoComponent {
  @Input({
    required: true
  }) store: Store;
}
