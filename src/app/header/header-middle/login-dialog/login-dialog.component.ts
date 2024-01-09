import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatInputModule } from '@angular/material/input';

@Component({
   selector: 'login-dialog',
   templateUrl: 'login-dialog.component.html',
   styleUrls: [ 'login-dialog.component.scss' ],
   imports: [
      MatIconModule,
      MatDialogContent,
      MatDialogClose,
      NgxMaskDirective,
      MatInputModule
   ],
   standalone: true,
   providers: [
      provideNgxMask(),
   ]
})

export class LoginDialogComponent {
}