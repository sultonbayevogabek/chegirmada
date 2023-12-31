import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogContent } from '@angular/material/dialog';

@Component({
   selector: 'login-dialog',
   templateUrl: 'login-dialog.component.html',
   styleUrls: [ 'login-dialog.component.scss' ],
   imports: [
      MatIconModule,
      MatDialogContent
   ],
   standalone: true
})

export class LoginDialogComponent {
}