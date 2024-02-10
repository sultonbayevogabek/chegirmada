import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Injectable()

export class ConfirmationService {
  dialogRef = inject(MatDialog);

  confirmation(
    message: string = 'Вы действительно хотите удалить?',
    cancel: string = 'Отмена',
    confirm: string = 'Удалить'
  ): Observable<boolean> {
    const dialog = this.dialogRef.open(
      ConfirmationComponent, {
        data: {
          message, cancel, confirm
        },
        width: '20rem'
      });
    return dialog.afterClosed();
  }
}
