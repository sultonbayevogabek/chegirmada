import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../components/confirmation/confirmation.component';

@Injectable()

export class ConfirmationService {
  dialogRef = inject(MatDialog);

  confirmation(
    message: string = 'are.you.sure.to.delete',
    cancel: string = 'cancel',
    confirm: string = 'delete'
  ): Observable<boolean> {
    const dialog = this.dialogRef.open(
      ConfirmationComponent, {
        data: {
          message, cancel, confirm
        },
        width: '100%',
        maxWidth: '22rem'
      });
    return dialog.afterClosed();
  }
}
