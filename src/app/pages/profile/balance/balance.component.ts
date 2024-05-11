import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { UiButtonComponent } from '../../../core/components/ui-button/ui-button.component';
import { BalanceService } from '../../../core/services/balance.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PaymentHistory } from '../../../core/models/payment-history.model';
import { SpinnerLoaderComponent } from '../../../core/components/spinner-loader/spinner-loader.component';
import { ProfileEmptyListComponent } from '../profile-empty-list/profile-empty-list.component';
import { DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { MyStoreService } from '../../../core/services/my-store.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OverlayComponent } from '../../../core/components/overlay-panel/overlay-panel.component';

@Component({
  selector: 'balance',
  templateUrl: 'balance.component.html',
  styleUrl: 'balance.component.scss',
  imports: [
    TranslateModule,
    UiButtonComponent,
    MatPaginator,
    SpinnerLoaderComponent,
    ProfileEmptyListComponent,
    DecimalPipe,
    NgClass,
    DatePipe,
    OverlayComponent,
    ReactiveFormsModule
  ],
  providers: [
    BalanceService,
    MyStoreService,
  ],
  standalone: true
})

export class BalanceComponent implements OnInit {
  loading = true;
  params = {
    page: 0,
    page_size: 5,
    total: 0
  };
  paymentHistory: PaymentHistory[] = [];
  balance = 0;
  paymentForm = new FormGroup({
    amount: new FormControl<number>(null, [
      Validators.required,
      Validators.min(1000),
      Validators.max(1000000)
    ])
  })

  private _destroyRef = inject(DestroyRef);
  private _balanceService = inject(BalanceService);
  private _myStoreService = inject(MyStoreService);

  ngOnInit(): void {
    this.getPaymentsHistory();

    this._myStoreService.getMyStoreData()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: data => {
          this.balance = +data.balance;
        }
      })
  }

  getPaymentsHistory(): void {
    this._balanceService.getPaymentHistory(this.params)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: data => {
          this.loading = false;
          this.paymentHistory = data?.results;
          this.params.total = data.count;
        },
        error: err => {
          this.loading = false;
        }
      });
  }

  changePage($event: PageEvent): void {
    this.params.page = $event.pageIndex;
    this.getPaymentsHistory();
  }

  payment(): void {
    const paymentForm = this.paymentForm;

    if (paymentForm.invalid || paymentForm.disabled) {
      return;
    }

    paymentForm.disable();

    this._balanceService.payment(
      paymentForm.get('amount').value,
      window.location.href
    )
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: res => {
          window.location.href = res.payment_url;
        },
        error: err => {
          paymentForm.enable();
        }
      });
  }
}
