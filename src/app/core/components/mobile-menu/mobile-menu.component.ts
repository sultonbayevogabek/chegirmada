import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'mobile-menu',
  templateUrl: 'mobile-menu.component.html',
  styleUrl: 'mobile-menu.component.scss',
  imports: [
    MatIcon,
    MatRipple
  ],
  standalone: true
})

export class MobileMenuComponent {

}
