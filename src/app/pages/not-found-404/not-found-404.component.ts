import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { UiButtonComponent } from '../../shared/components/ui-button/ui-button.component';

@Component({
  selector: 'not-found-404',
  templateUrl: 'not-found-404.component.html',
  styleUrl: 'not-found-404.component.scss',
  imports: [
    NgOptimizedImage,
    UiButtonComponent
  ],
  standalone: true
})

export class NotFound404Component {}
