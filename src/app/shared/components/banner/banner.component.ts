import { Component, ViewEncapsulation } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'banner',
  templateUrl: 'banner.component.html',
  styleUrls: [ 'banner.component.scss' ],
  imports: [
    NgOptimizedImage
  ],
  standalone: true
})

export class BannerComponent {
}
