import { Component, Input } from '@angular/core';
import { MatTabLink, MatTabNav, MatTabNavPanel } from '@angular/material/tabs';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'tabs',
  templateUrl: 'tabs.component.html',
  styleUrl: 'tabs.component.scss',
  imports: [
    MatTabLink,
    MatTabNav,
    MatTabNavPanel,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  standalone: true
})

export class TabsComponent {
  @Input({ required: true }) tabs: {
    routerLink: string[],
    text: string
  }[];
}
