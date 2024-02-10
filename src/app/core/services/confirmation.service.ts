import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfirmationModel } from '../models/confirmation.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Injectable()

export class ConfirmationService {
  dialogRef = inject(MatDialog);
  confirmation(confirmation: ConfirmationModel): Observable<boolean> {
    const dialog = this.dialogRef.open(ConfirmationComponent, {
      data: confirmation,
      width: '25rem'
    });
    return dialog.afterClosed();
  }
}
