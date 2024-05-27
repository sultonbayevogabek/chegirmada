import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'partners',
  templateUrl: 'partners.component.html',
  styleUrl: 'partners.component.scss',
  imports: [
    NgOptimizedImage,
    MatIconModule,
    TranslateModule
  ],
  standalone: true
})

export class PartnersComponent {
}
