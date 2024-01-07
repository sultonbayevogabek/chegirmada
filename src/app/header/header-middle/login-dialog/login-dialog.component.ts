import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
   selector: 'login-dialog',
   templateUrl: 'login-dialog.component.html',
   styleUrls: [ 'login-dialog.component.scss' ],
   imports: [
      MatIconModule
   ],
   standalone: true
})

export class LoginDialogComponent {
}