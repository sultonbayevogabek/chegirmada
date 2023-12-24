import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
   selector: 'notifications-button',
   templateUrl: 'notifications-button.component.html',
   styleUrls: [ 'notifications-button.component.scss' ],
   imports: [
      MatIconModule
   ],
   standalone: true
})

export class NotificationsButtonComponent {

}