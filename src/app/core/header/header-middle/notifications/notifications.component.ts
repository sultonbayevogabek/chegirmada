import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { MatRipple } from '@angular/material/core';
import { OverlayComponent } from '../../../../shared/components/overlay-panel/overlay-panel.component';

@Component({
  selector: 'notifications',
  templateUrl: 'notifications.component.html',
  styleUrl: 'notifications.component.scss',
  imports: [
    MatIconModule,
    OverlayComponent,
    NgOptimizedImage,
    MatRipple,
    NgTemplateOutlet
  ],
  standalone: true
})

export class NotificationsComponent implements OnInit{
  @ViewChild('overlayPanel', { static: true }) overlayPanel: OverlayComponent;
  ngOnInit() {
  }
}
