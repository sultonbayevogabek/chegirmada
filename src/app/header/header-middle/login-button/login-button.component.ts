import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
   selector: 'login-button',
   templateUrl: 'login-button.component.html',
   styleUrls: [ 'login-button.component.scss' ],
   imports: [
      MatIconModule
   ],
   standalone: true
})

export class LoginButtonComponent {
   dialog = inject(MatDialog);

   openLoginDialog(): void {
      this.dialog.open(LoginDialogComponent)
   }
}