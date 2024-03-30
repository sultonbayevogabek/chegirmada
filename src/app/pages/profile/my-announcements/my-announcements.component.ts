import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'my-announcements',
  templateUrl: 'my-announcements.component.html',
  styleUrl: 'my-announcements.component.scss',
  imports: [
    RouterOutlet
  ],
  standalone: true
})

export class MyAnnouncementsComponent {

}
