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
import { ToasterService } from '../../../core/services/toaster.service';
import { DialogRef } from '@angular/cdk/dialog';

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
    store_shortname: new FormControl(null)
  });

  private _complaintService = inject(ComplaintService);
  private _toasterService = inject(ToasterService);
  private _destroyRef = inject(DestroyRef);
  private _dialogRef = inject(DialogRef);

  ngOnInit(): void {
    if (this.data && 'complaintType' in this.data) {
      this.complaintForm.get('complaint_type').setValue(this.data.complaintType);
    }

    if (this.data && 'storeShortname' in this.data) {
      this.complaintForm.get('store_shortname').setValue(this.data.storeShortname);
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
        next: () => {
          this._toasterService.open({
            message: 'your.complaint.has.been.successfully.submitted'
          });
          this._dialogRef.close();
        },
        error: () => {
          this._toasterService.open({
            message: 'error.occurred',
            type: 'error',
            title: 'attention'
          });
        }
      });
  }
}
