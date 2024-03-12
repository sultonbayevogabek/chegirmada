import { Component, DestroyRef, Inject, inject, OnInit } from '@angular/core';
import { NgxMaskDirective } from 'ngx-mask';
import { IconButtonComponent } from '../../../shared/components/icon-button/icon-button.component';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { UiButtonComponent } from '../../../shared/components/ui-button/ui-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatOption, MatSelect } from '@angular/material/select';
import { COMPLAINT_TYPES } from '../../../core/constants/complaint-types';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComplaintService } from '../../../core/services/complaint.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'complaint-modal',
  templateUrl: 'complaint-modal.component.html',
  styleUrl: 'complaint-modal.component.scss',
  imports: [
    IconButtonComponent,
    MatDialogClose,
    MatDialogContent,
    UiButtonComponent,
    NgxMaskDirective,
    TranslateModule,
    MatSelect,
    MatOption,
    ReactiveFormsModule
  ],
  providers: [
    ComplaintService
  ],
  standalone: true
})

export class ComplaintModalComponent implements OnInit {
  @Inject(MAT_DIALOG_DATA) data: {
    complaintType?: number;
    storeShortname?: string;
  } = inject(MAT_DIALOG_DATA);

  complaintTypes = COMPLAINT_TYPES;
  complaintForm = new FormGroup({
    complaint_type: new FormControl(null, [ Validators.required ]),
    message: new FormControl('', [ Validators.maxLength(255) ]),
    store_shortname: new FormControl({ value: null, disabled: true })
  });

  private _complaintService = inject(ComplaintService);
  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    if (this.data && 'complaintType' in this.data) {
      const complaintTypeControl = this.complaintForm.get('complaint_type');
      complaintTypeControl.setValue(this.data.complaintType);
      complaintTypeControl.disable();
    }

    if (this.data && 'storeShortname' in this.data) {
      const storeShortnameControl = this.complaintForm.get('store_shortname');
      storeShortnameControl.setValue(this.data.storeShortname);
    }
  }

  sendComplaint(): void {
    if (this.complaintForm.invalid || this.complaintForm.disabled) {
      return;
    }

    this.complaintForm.disable();

    this._complaintService.sendComplaint(this.complaintForm.getRawValue())
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: res => {
          this.complaintForm.enable()
          console.log(res);
        },
        error: err => {
          this.complaintForm.enable()
          console.log(err);
        }
      });
  }
}
