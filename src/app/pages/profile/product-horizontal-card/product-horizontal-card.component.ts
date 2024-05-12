import { Component, inject, Input } from '@angular/core';
import { DatePipe, DecimalPipe, NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {
  ActivateAnnouncementModalComponent
} from '../my-announcements/activate-announcement-modal/activate-announcement-modal.component';
import { IconButtonComponent } from '../../../core/components/icon-button/icon-button.component';
import { UiButtonComponent } from '../../../core/components/ui-button/ui-button.component';
import { ProductCard } from '../../../core/models/wishlist.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'product-horizontal-card',
  templateUrl: 'product-horizontal-card.component.html',
  styleUrl: 'product-horizontal-card.component.scss',
  imports: [
    NgOptimizedImage,
    MatIconModule,
    RouterLink,
    IconButtonComponent,
    UiButtonComponent,
    DecimalPipe,
    TranslateModule,
    DatePipe
  ],
  standalone: true
})

export class ProductHorizontalCardComponent {
  @Input({ required: true }) product: ProductCard;
  activeIndex = 0;

  private _dialog = inject(MatDialog);

  openModal(): void {
    this._dialog.open(ActivateAnnouncementModalComponent, {
      width: '26rem'
    })
  }
}
