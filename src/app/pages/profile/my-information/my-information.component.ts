import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatNativeDateModule, MatOption, MatRipple } from '@angular/material/core';
import { UiButtonComponent } from '../../../shared/components/ui-button/ui-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatSelect } from '@angular/material/select';
import { UserModel } from '../../../core/models/user.model';
import { AuthService } from '../../../core/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { REGIONS } from '../../../core/constants/regions';
import { MyInformationService } from '../../../core/services/my-information.service';
import { MatDatepicker, MatDatepickerInput, MatDatepickerModule } from '@angular/material/datepicker';
import { formatDate } from '@angular/common';
import { ToasterService } from '../../../core/services/toaster.service';
import { DistrictModel } from '../../../core/models/district.model';

@Component({
  selector: 'my-information',
  templateUrl: 'my-information.component.html',
  styleUrl: 'my-information.component.scss',
  imports: [
    MatIcon,
    MatRipple,
    UiButtonComponent,
    TranslateModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    MatSelect,
    MatOption,
    MatDatepicker,
    MatDatepickerInput,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  providers: [
    provideNgxMask(),
    MyInformationService
  ],
  standalone: true
})

export class MyInformationComponent implements OnInit {
  private _authService = inject(AuthService);
  private _myInformationService = inject(MyInformationService);
  private _toasterService = inject(ToasterService);
  private _destroyRef = inject(DestroyRef);
  protected readonly regions = REGIONS;

  districts: DistrictModel[] = [];
  currentUser: UserModel;
  myInfoForm = new FormGroup({
    phone_number: new FormControl({ value: null, disabled: true }, [ Validators.required ]),
    email: new FormControl(null),
    full_name: new FormControl(null, [ Validators.required ]),
    gender: new FormControl(null),
    region: new FormControl(null),
    district: new FormControl(null),
    birthday: new FormControl(null)
  });

  ngOnInit(): void {
    this._authService.currentUser$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: user => {
          if (!user) return;

          this.myInfoForm.setValue(user);
          this.getDistrictsList();
        }
      });
  }

  updateInformation(): void {
    this.myInfoForm.markAllAsTouched();

    if (this.myInfoForm.invalid || this.myInfoForm.disabled) {
      return;
    }

    this.myInfoForm.disable();

    this._myInformationService.updateUserInformation({
      ...this.myInfoForm.getRawValue(),
      birthday: formatDate(this.myInfoForm.get('birthday').value, 'yyyy-MM-dd', 'ru')
    })
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: user => {
          if (!user) return;

          this._authService.currentUser$.next(user);
          this._toasterService.open({
            message: 'changes.successfully.changed'
          });
          this.myInfoForm.enable();
        },
        error: err => {
          this.myInfoForm.enable();
        }
      });
  }

  getDistrictsList(): void {
    const regionId: number = this.myInfoForm.get('region').value;

    if (!regionId) {
      return;
    }

    this._myInformationService.getDistrictsByRegionId(regionId)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: districts => {
          this.districts = districts;
        },
        error: () => {
          this.districts = [];
        }
      })
  }

  onRegionSelected(): void {
    this.myInfoForm.get('district').setValue(null);
    this.getDistrictsList();
  }
}
