import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../components/confirmation/confirmation.component';
import { UiButtonTypeModel } from '../models/ui-button-type.model';

@Injectable()

export class ConfirmationService {
  dialogRef = inject(MatDialog);

  confirmation(
    {
      message = 'are.you.sure.to.delete',
      cancel = 'cancel',
      confirm = 'delete',
      confirmButtonType = 'red'
    }: {
      message?: string,
      cancel?: string,
      confirm?: string,
      confirmButtonType?: UiButtonTypeModel
    }
  ): Observable<boolean> {
    const dialog = this.dialogRef.open(
      ConfirmationComponent, {
        data: {
          message, cancel, confirm, confirmButtonType
        },
        width: '100%',
        maxWidth: '22rem'
      });
    return dialog.afterClosed();
  }
}
