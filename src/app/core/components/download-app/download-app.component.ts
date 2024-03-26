import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'download-app',
  templateUrl: 'download-app.component.html',
  styleUrl: 'download-app.component.scss',
  imports: [
    NgOptimizedImage
  ],
  standalone: true
})

export class DownloadAppComponent {
}
