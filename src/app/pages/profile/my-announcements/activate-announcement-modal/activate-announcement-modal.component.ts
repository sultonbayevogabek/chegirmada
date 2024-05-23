import { Component, DestroyRef, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IconButtonComponent } from '../../../../core/components/icon-button/icon-button.component';
import { ScrollbarDirective } from '../../../../core/directives/scrollbar.directive';
import { UiButtonComponent } from '../../../../core/components/ui-button/ui-button.component';
import { MyAnnouncementsService } from '../../../../core/services/my-announcements.service';
import { AdvertisingTypeModel } from '../../../../core/models/advertising-type.model';
import { takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';
import { MatIcon } from '@angular/material/icon';
import { MatOption, MatSelect } from '@angular/material/select';
import { UiButtonTypeModel } from '../../../../core/models/ui-button-type.model';
import { MyStoreService } from '../../../../core/services/my-store.service';
import { ToasterService } from '../../../../core/services/toaster.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'activate-announcement-modal',
  imports: [
    IconButtonComponent,
    MatDialogClose,
    MatDialogContent,
    MatRadioButton,
    MatRadioGroup,
    NgxMaskDirective,
    ScrollbarDirective,
    UiButtonComponent,
    MatSlider,
    MatSliderThumb,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    MatIcon,
    MatSelect,
    MatOption
  ],
  templateUrl: './activate-announcement-modal.component.html',
  styleUrl: './activate-announcement-modal.component.scss',
  standalone: true,
  providers: [
    provideNgxMask(),
    MyAnnouncementsService,
    MyStoreService,
    ToasterService
  ]
})

export class ActivateAnnouncementModalComponent implements OnInit {
  @Inject(MAT_DIALOG_DATA) data: {
    discount: number
  } = inject(MAT_DIALOG_DATA);

  advertisingTypesList: AdvertisingTypeModel[] = [];
  price = 0;
  balance = 0;
  advertisingForm: FormGroup = new FormGroup({
    discount: new FormControl<number>(null, [ Validators.required ]),
    advertisement: new FormControl<number>(null, [ Validators.required ])
  });

  private _myAnnouncementsService = inject(MyAnnouncementsService);
  private _toasterService = inject(ToasterService);
  private _myStoreService = inject(MyStoreService);
  private _destroyRef = inject(DestroyRef);
  private _dialogRef = inject(MatDialogRef);

  ngOnInit(): void {
    this.advertisingForm.get('discount').setValue(this.data.discount);
    this.getAdvertisingTypesList();
    this.getBalance();
  }

  getAdvertisingTypesList(): void {
    this._myAnnouncementsService.getAdvertisingTypes()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(res => {
        this.advertisingTypesList = res;

        if (!this.advertisingTypesList?.length) return;

        this.advertisingForm.get('advertisement').setValue(this.advertisingTypesList[0].pk);
        this.price = this.advertisingTypesList[0].price;
      });
  }

  getBalance(): void {
    this._myStoreService.getMyStoreData()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(res => {
        this.balance = +res?.balance || 0;
      });
  }

  advertisingTypeChanged(): void {
    const id = this.advertisingForm.get('advertisement').value;
    this.price = this.advertisingTypesList.find(i => i.pk === id)?.price;
  }

  advertiseAnnouncement(): void {
    const form = this.advertisingForm;

    if (form.invalid || form.disabled) return;

    if (this.price > this.balance) {
      this._toasterService.open({
        type: 'warning',
        title: 'attention',
        message: 'your.balance.insufficient'
      });
      return;
    }

    form.disable();

    this._myAnnouncementsService.buyAdvertising(form.getRawValue())
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(res => {
        this._toasterService.open({
          message: 'ad.was.successfully.purchased'
        })
        this._dialogRef.close('bought');
      }, err => {
        form.disable();
      })
  }
}
