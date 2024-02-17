import { Component } from '@angular/core';
import { MatTab, MatTabLink, MatTabNav, MatTabNavPanel } from '@angular/material/tabs';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'my-announcements',
  templateUrl: 'my-announcements.component.html',
  styleUrl: 'my-announcements.component.scss',
  imports: [
    MatTabNav,
    MatTabLink,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MatTab,
    MatTabNavPanel
  ],
  standalone: true
})

export class MyAnnouncementsComponent {}
