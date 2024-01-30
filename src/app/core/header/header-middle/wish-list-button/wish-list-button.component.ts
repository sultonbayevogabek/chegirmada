import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'wish-list-button',
  templateUrl: 'wish-list-button.component.html',
  styleUrl: 'wish-list-button.component.scss',
  imports: [
    MatIconModule,
    RouterLink,
    RouterLinkActive
  ],
  standalone: true
})

export class WishListButtonComponent {

}
