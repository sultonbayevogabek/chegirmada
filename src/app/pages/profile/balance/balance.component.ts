import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { UiButtonComponent } from '../../../core/components/ui-button/ui-button.component';
import { BalanceService } from '../../../core/services/balance.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PaymentHistory } from '../../../core/models/payment-history.model';
import { SpinnerLoaderComponent } from '../../../core/components/spinner-loader/spinner-loader.component';
import { ProfileEmptyListComponent } from '../profile-empty-list/profile-empty-list.component';

@Component({
  selector: 'balance',
  templateUrl: 'balance.component.html',
  styleUrl: 'balance.component.scss',
  imports: [
    TranslateModule,
    UiButtonComponent,
    MatPaginator,
    SpinnerLoaderComponent,
    ProfileEmptyListComponent
  ],
  providers: [
    BalanceService
  ],
  standalone: true
})

export class BalanceComponent implements OnInit {
  loading = true;
  params = {
    page: 0,
    page_size: 3,
    total: 0,
  }
  paymentHistory: PaymentHistory[] = [];

  private _destroyRef = inject(DestroyRef);
  private _balanceService = inject(BalanceService);

  ngOnInit(): void {
    this.getPaymentsHistory()
  }

  getPaymentsHistory(): void {
    this._balanceService.getPaymentHistory(this.params)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: data => {
          this.loading = false;
          this.paymentHistory = data?.results;
          this.params.total = data.count
        },
        error: err => {
          this.loading = false;
        }
      })
  }

  changePage($event: PageEvent): void {
    this.params.page = $event.pageIndex;
    this.getPaymentsHistory();
  }
}
