import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationModel } from '../models/confirmation.model';
import { MatButton } from '@angular/material/button';
import { Observable } from 'rxjs';

@Component({
  selector: 'confirmation',
  templateUrl: 'confirmation.component.html',
  imports: [
    MatButton
  ],
  standalone: true
})

export class ConfirmationComponent {
  dialogRef = inject(MatDialogRef<ConfirmationComponent>);
  @Inject(MAT_DIALOG_DATA) data: ConfirmationModel;

  confirmationAction(result: boolean): void {
    this.dialogRef.close(result);
  }
}
