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
import { PackagesService } from '../../../core/services/packages.service';

@Component({
  selector: 'packages',
  templateUrl: 'packages.component.html',
  styleUrl: 'packages.component.scss',
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
    PackagesService
  ],
  standalone: true
})

export class PackagesComponent implements OnInit {
  loading = true;
  params = {
    page: 0,
    page_size: 5,
    total: 0
  };
  packages: any[] = [];
  balance = 0;
  paymentForm = new FormGroup({
    amount: new FormControl<number>(null, [
      Validators.required,
      Validators.min(1000),
      Validators.max(1000000)
    ])
  });

  private _destroyRef = inject(DestroyRef);
  private _balanceService = inject(BalanceService);
  private _myStoreService = inject(MyStoreService);
  private _packagesService = inject(PackagesService);

  ngOnInit(): void {
    this.getMyPackages();

    this._myStoreService.getMyStoreData()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: data => {
          this.balance = +data.balance;
        }
      });
  }

  changePage($event: PageEvent): void {
    this.params.page = $event.pageIndex;
  }

  getMyPackages(): void {
    this._packagesService.getPackagesList(this.params)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: data => {}
      });
  }
}
