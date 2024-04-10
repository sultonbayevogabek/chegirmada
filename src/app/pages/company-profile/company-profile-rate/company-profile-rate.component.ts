import { Component, DestroyRef, Inject, inject, OnInit } from '@angular/core';
import { NgxMaskDirective } from 'ngx-mask';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatOption, MatSelect } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToasterService } from '../../../core/services/toaster.service';
import { DialogRef } from '@angular/cdk/dialog';
import { IconButtonComponent } from '../../../core/components/icon-button/icon-button.component';
import { UiButtonComponent } from '../../../core/components/ui-button/ui-button.component';
import { NgOptimizedImage } from '@angular/common';
import { ImgWrapperComponent } from '../../../core/components/img-wrapper/img-wrapper.component';
import { CompanyProfileService } from '../../../core/services/company-profile.service';
import { TrimDirective } from '../../../core/directives/trim.directive';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'company-profile-rate',
  templateUrl: 'company-profile-rate.component.html',
  styleUrl: 'company-profile-rate.component.scss',
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
    NgOptimizedImage,
    ImgWrapperComponent,
    TrimDirective
  ],
  providers: [
    CompanyProfileService
  ],
  standalone: true
})

export class CompanyProfileRateComponent implements OnInit {
  @Inject(MAT_DIALOG_DATA) data: {
    name: string;
    shortname?: string;
    logo?: string;
    storeId: number;
  } = inject(MAT_DIALOG_DATA);

  private _toasterService = inject(ToasterService);
  private _companyProfileService = inject(CompanyProfileService);
  private _destroyRef = inject(DestroyRef);
  private _dialogRef = inject(DialogRef);

  rateForm = new FormGroup({
    comment: new FormControl<string>('', [ Validators.maxLength(255) ]),
    value: new FormControl<number>(0, [Validators.min(1)]),
    store: new FormControl<number>(null, [ Validators.required ])
  })

  ngOnInit(): void {
    this.rateForm.get('store').setValue(this.data.storeId);
  }

  rateCompany(): void {
    const form = this.rateForm;

    if (form.invalid || form.disabled) {
      return;
    }

    form.disable();
    this._companyProfileService.rateCompany(form.getRawValue())
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: () => {
          this._toasterService.open({
            title: 'dear.user',
            message: 'thanks.for.leaving.comment'
          })
          this._dialogRef.close();
        },
        error: () => {
          form.enable()
          this._toasterService.open({
            title: 'attention',
            message: 'error.occurred',
            type: 'error'
          })
        }
      })
  }
}
