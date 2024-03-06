import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'location',
  templateUrl: 'location.component.html',
  styleUrl: 'location.component.scss',
  imports: [
    MatIconModule,
    TranslateModule
  ],
  standalone: true
})

export class LocationComponent {
}
