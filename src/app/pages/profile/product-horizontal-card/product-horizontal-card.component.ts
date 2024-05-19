import { Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { DatePipe, DecimalPipe, NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {
  ActivateAnnouncementModalComponent
} from '../my-announcements/activate-announcement-modal/activate-announcement-modal.component';
import { IconButtonComponent } from '../../../core/components/icon-button/icon-button.component';
import { UiButtonComponent } from '../../../core/components/ui-button/ui-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { Announcement } from '../../../core/models/announcement.model';
import { ConfirmationService } from '../../../core/services/confirmation.service';
import { MyAnnouncementsService } from '../../../core/services/my-announcements.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  standalone: true,
  providers: [
    ConfirmationService,
    MyAnnouncementsService
  ]
})

export class ProductHorizontalCardComponent implements OnInit {
  @Input({ required: true }) product: Announcement;
  @Output('onProductDeleted') productDeleted = new EventEmitter<void>();
  activeIndex = 0;

  private _dialog = inject(MatDialog);
  private _confirmationService = inject(ConfirmationService);
  private _myAnnouncementsService = inject(MyAnnouncementsService);
  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {

  }

  openModal(): void {
    this._dialog.open(ActivateAnnouncementModalComponent, {
      width: '26rem'
    })
  }

  confirmationDelete(): void {
    this._confirmationService.confirmation()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(res => {
        if (!res) return;

        this.deleteProduct();
      })
  }

  deleteProduct(): void {
    this._myAnnouncementsService.deleteAnnouncement(this.product.pk)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(res => {
        this.productDeleted.emit();
      })
  }
}
