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
import { DISTRICTS, REGIONS } from '../../../core/constants/regions';
import { MyInformationService } from '../../../core/services/my-information.service';
import { MatDatepicker, MatDatepickerInput, MatDatepickerModule } from '@angular/material/datepicker';
import { formatDate } from '@angular/common';
import { ToasterService } from '../../../core/services/toaster.service';

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
  protected readonly districts = DISTRICTS;
  currentUser: UserModel;
  myInfoForm = new FormGroup({
    phone_number: new FormControl({ value: null, disabled: true }, [ Validators.required ]),
    email: new FormControl(null),
    full_name: new FormControl(null, [ Validators.required ]),
    gender: new FormControl(null, [ Validators.required ]),
    region: new FormControl(null, [ Validators.required ]),
    district: new FormControl(null, [ Validators.required ]),
    birthday: new FormControl(null, [ Validators.required ])
  });

  ngOnInit(): void {
    this._authService.currentUser$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: user => {
          this.myInfoForm.setValue(user);
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
        next: res => {
          this._authService.currentUser$.next(res);
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
}
