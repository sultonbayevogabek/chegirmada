import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'site-logo',
  templateUrl: './site-logo.component.html',
  styleUrls: [ './site-logo.component.scss' ],
  imports: [
    RouterLink,
    NgOptimizedImage
  ],
  standalone: true
})

export class SiteLogoComponent {
}
