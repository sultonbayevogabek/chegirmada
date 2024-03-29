import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { UiButtonTypeModel } from '../../models/ui-button-type.model';
import { UiButtonComponent } from '../ui-button/ui-button.component';

@Component({
  selector: 'confirmation',
  templateUrl: 'confirmation.component.html',
  styleUrl: 'confirmation.component.scss',
  imports: [
    MatButton,
    MatDialogContent,
    UiButtonComponent,
    TranslateModule
  ],
  standalone: true
})

export class ConfirmationComponent {
  dialogRef = inject(MatDialogRef<ConfirmationComponent>);
  @Inject(MAT_DIALOG_DATA) data: {
    message: string;
    cancel: string;
    confirm: string;
    confirmButtonType: UiButtonTypeModel;
  } = inject(MAT_DIALOG_DATA);

  confirmationAction(result: boolean): void {
    this.dialogRef.close(result);
  }
}
