import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'links',
  templateUrl: 'links.component.html',
  styleUrl: 'links.component.scss',
  imports: [
    TranslateModule
  ],
  standalone: true
})

export class LinksComponent {
}
