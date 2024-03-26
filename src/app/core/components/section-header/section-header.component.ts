import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'section-header',
  templateUrl: 'section-header.component.html',
  styleUrl: 'section-header.component.scss',
  imports: [
    MatIconModule,
    RouterLink,
    TranslateModule
  ],
  standalone: true
})

export class SectionHeaderComponent {
  @Input({ required: true }) heading: string;
  @Input() url: string;
}
