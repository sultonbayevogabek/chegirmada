import { Component, inject, OnInit } from '@angular/core';
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
import { AsyncPipe, formatDate } from '@angular/common';
import { ToasterService } from '../../../core/services/toaster.service';
import { DistrictModel } from '../../../core/models/district.model';
import { ShowByLangPipe } from '../../../core/pipes/show-by-lang.pipe';
import { BaseComponent } from '../../../core/components/base/base.component';
import { RouterLink } from '@angular/router';
import { TrimDirective } from '../../../core/directives/trim.directive';

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
    MatDatepickerModule,
    ShowByLangPipe,
    AsyncPipe,
    RouterLink,
    TrimDirective
  ],
  providers: [
    provideNgxMask(),
    MyInformationService
  ],
  standalone: true
})

export class MyInformationComponent extends BaseComponent implements OnInit {
  private _authService = inject(AuthService);
  private _myInformationService = inject(MyInformationService);
  private _toasterService = inject(ToasterService);
  protected readonly regions = REGIONS;

  constructor() {
    super();
  }

  districts: DistrictModel[] = [];
  currentUser: UserModel;
  maxBirthday = new Date(new Date().getFullYear() - 10, 11, 31);
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
      .pipe(takeUntilDestroyed(this.destroyRef))
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
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: user => {
          if (!user) return;
          this._authService.currentUser$.next(user);
          this._toasterService.open({
            message: 'changes.successfully.changed'
          });
          this.myInfoForm.enable();
        },
        error: () => {
          this.myInfoForm.enable();
        }
      });
  }

  getDistrictsList(): void {
    const regionId = this.myInfoForm.get('region').value;

    this._myInformationService.getDistrictsByRegionId(regionId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: districts => {
          this.districts = districts;
        },
        error: () => {
          this.districts = [];
        }
      });
  }

  onRegionSelected(): void {
    this.myInfoForm.get('district').setValue(null);
    this.getDistrictsList();
  }

  onClickDistrictsSelect(): void {
    if (this.myInfoForm.get('region').value) {
      return;
    }

    this._toasterService.open({
      type: 'info',
      title: 'dear.user',
      message: 'please.specify.your.region.first'
    });
  }
}
