import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  OverlayComponent
} from '../../../shared/components/overlay-panel/overlay-panel.component';
import { NgOptimizedImage } from '@angular/common';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'notifications-button',
  templateUrl: 'notifications-button.component.html',
  styleUrl: 'notifications-button.component.scss',
  imports: [
    MatIconModule,
    OverlayComponent,
    NgOptimizedImage,
    MatRipple
  ],
  standalone: true
})

export class NotificationsButtonComponent {

}
