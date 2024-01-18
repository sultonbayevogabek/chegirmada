import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'section-header',
  templateUrl: 'section-header.component.html',
  styleUrls: [ 'section-header.component.scss' ],
  imports: [
    MatIconModule,
    RouterLink
  ],
  standalone: true
})

export class SectionHeaderComponent {
  @Input({ required: true }) heading: string;
  @Input() url: string;
}
