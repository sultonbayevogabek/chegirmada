import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

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
}