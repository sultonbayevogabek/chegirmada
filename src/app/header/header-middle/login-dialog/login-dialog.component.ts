import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogClose, MatDialogContent } from '@angular/material/dialog';

@Component({
   selector: 'login-dialog',
   templateUrl: 'login-dialog.component.html',
   styleUrls: [ 'login-dialog.component.scss' ],
   imports: [
      MatIconModule,
      MatDialogContent,
      MatDialogClose
   ],
   standalone: true
})

export class LoginDialogComponent {
}