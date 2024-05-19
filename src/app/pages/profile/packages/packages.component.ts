import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { UiButtonComponent } from '../../../core/components/ui-button/ui-button.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SpinnerLoaderComponent } from '../../../core/components/spinner-loader/spinner-loader.component';
import { ProfileEmptyListComponent } from '../profile-empty-list/profile-empty-list.component';
import { DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { MyStoreService } from '../../../core/services/my-store.service';
import { ReactiveFormsModule } from '@angular/forms';
import { OverlayComponent } from '../../../core/components/overlay-panel/overlay-panel.component';
import { PackagesService } from '../../../core/services/packages.service';
import { PackageModel } from '../../../core/models/package.model';
import { CATEGORIES_OBJECT } from '../../../core/constants/categories';
import { MatDialog } from '@angular/material/dialog';
import { BuyPackageModalComponent } from '../buy-package-modal/buy-package-modal.component';

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
  packages: PackageModel[] = [];
  balance = 0;
  CATEGORIES_OBJECT = CATEGORIES_OBJECT;

  private _destroyRef = inject(DestroyRef);
  private _myStoreService = inject(MyStoreService);
  private _packagesService = inject(PackagesService);
  private _matDialog = inject(MatDialog);

  ngOnInit(): void {
    this.getMyPackages();
    this.getBalance();
  }

  changePage($event: PageEvent): void {
    this.params.page = $event.pageIndex;
    this.getMyPackages();
  }

  getMyPackages(): void {
    this._packagesService.getPackagesList(this.params)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: data => {
          this.loading = false;
          this.packages = data?.results || [];
          this.params.total = +data?.count;
        },
        error: () => {
          this.loading = false;
        }
      });
  }

  getBalance(): void {
    this._myStoreService.getMyStoreData()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: data => {
          this.balance = +data?.balance;
        }
      });
  }

  buyPackageModalOpen(): void {
    const buyPackageDialog = this._matDialog.open(BuyPackageModalComponent, {
      width: '30rem',
      maxWidth: '100%',
      data: {
        balance: this.balance
      }
    })

    buyPackageDialog
      .afterClosed()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(data => {
        console.log(data);
        if (data === 'new-package') {
          this.getBalance();
          this.params.page = 0;
          this.getMyPackages();
        }
      })
  }
}
