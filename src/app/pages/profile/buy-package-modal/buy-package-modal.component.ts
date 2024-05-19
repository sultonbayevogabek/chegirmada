import { Component, DestroyRef, Inject, inject, OnInit } from '@angular/core';
import { NgxMaskDirective } from 'ngx-mask';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatOption, MatSelect } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToasterService } from '../../../core/services/toaster.service';
import { DialogRef } from '@angular/cdk/dialog';
import { IconButtonComponent } from '../../../core/components/icon-button/icon-button.component';
import { UiButtonComponent } from '../../../core/components/ui-button/ui-button.component';
import { PackagesService } from '../../../core/services/packages.service';
import { takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Discount, PackageType } from '../../../core/models/package.model';
import { CATEGORIES, CATEGORIES_OBJECT } from '../../../core/constants/categories';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'buy-package-modal',
  templateUrl: 'buy-package-modal.component.html',
  styleUrl: 'buy-package-modal.component.scss',
  imports: [
    IconButtonComponent,
    MatDialogClose,
    MatDialogContent,
    UiButtonComponent,
    NgxMaskDirective,
    TranslateModule,
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    DecimalPipe
  ],
  providers: [
    PackagesService
  ],
  standalone: true
})

export class BuyPackageModalComponent implements OnInit {
  @Inject(MAT_DIALOG_DATA) data: {
    balance: number;
  } = inject(MAT_DIALOG_DATA);

  CATEGORIES_OBJECT = CATEGORIES_OBJECT;
  packageTypes: PackageType[] = [];
  discounts: Discount[] = [];
  price = 0;

  buyPackageForm: FormGroup = new FormGroup({
    tariff: new FormControl(null, [ Validators.required ]),
    quantity: new FormControl(null, [ Validators.required ])
  });

  private _toasterService = inject(ToasterService);
  private _packagesService = inject(PackagesService);
  private _destroyRef = inject(DestroyRef);
  private _dialogRef = inject(MatDialogRef);

  ngOnInit(): void {
    this._packagesService.getPackageTypes()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: data => {
          this.packageTypes = data?.tariffs;
          this.discounts = data?.discounts;
        }
      });
  }

  calculatePrice(): void {
    const form = this.buyPackageForm;

    if (form.invalid) {
      return;
    }

    const { tariff, quantity } = form.getRawValue();
    const packagePrice = +this.packageTypes.find(i => i?.id === tariff)?.price;
    const discountPrice = +this.discounts.find(i => i.min_quantity === quantity)?.discount_price;
    this.price = quantity * packagePrice;

    if (discountPrice) {
      this.price = this.price - discountPrice;
    }
  }

  buyPackage(): void {
    const form = this.buyPackageForm;

    if (form.invalid || form.disabled) {
      return;
    }

    if (this.price > this.data.balance) {
      this._toasterService.open({
        type: 'warning',
        title: 'attention',
        message: 'your.balance.insufficient'
      });
      return;
    }

    form.disable();
    const { tariff, quantity } = form.getRawValue();
    this._packagesService.buyPackage(tariff, quantity)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: _ => {
          this._dialogRef.close('new-package');
        },
        error: _ => {
          form.enable();
        }
      });
  }
}
