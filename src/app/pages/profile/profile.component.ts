import { Component } from '@angular/core';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'profile',
  templateUrl: 'profile.component.html',
  styleUrl: 'profile.component.scss',
  imports: [
    SectionHeaderComponent,
    RouterLink,
    MatIcon,
    MatRipple,
    RouterOutlet,
    RouterLinkActive
  ],
  standalone: true
})

export class ProfileComponent {}
