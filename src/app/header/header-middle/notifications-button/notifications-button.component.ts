import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  OverlayComponent
} from '../../../shared/components/overlay-panel/overlay-panel.component';

@Component({
  selector: 'notifications-button',
  templateUrl: 'notifications-button.component.html',
  styleUrls: [ 'notifications-button.component.scss' ],
  imports: [
    MatIconModule,
    OverlayComponent
  ],
  standalone: true
})

export class NotificationsButtonComponent {

}
