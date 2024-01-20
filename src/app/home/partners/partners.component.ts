import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'partners',
  templateUrl: 'partners.component.html',
  styleUrls: [ 'partners.component.scss' ],
  imports: [
    NgOptimizedImage,
    MatIconModule
  ],
  standalone: true
})

export class PartnersComponent {
}
