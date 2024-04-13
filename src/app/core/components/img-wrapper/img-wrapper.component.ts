import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'img-wrapper',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: 'img-wrapper.component.html',
  styleUrl: 'img-wrapper.component.scss'
})

export class ImgWrapperComponent {
  @Input({ required: true }) src: string;
}
