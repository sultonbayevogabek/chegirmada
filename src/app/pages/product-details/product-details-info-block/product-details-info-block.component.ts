import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { ProductDetails } from '../../../core/models/product-details.model';
import { TranslateModule } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'product-details-info-block',
  templateUrl: 'product-details-info-block.component.html',
  styleUrl: 'product-details-info-block.component.scss',
  imports: [
    MatIcon,
    MatIconButton,
    TranslateModule,
    DatePipe
  ],
  standalone: true
})

export class ProductDetailsInfoBlockComponent {
  @Input({
    required: true
  }) details: ProductDetails;
}
