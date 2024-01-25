import { Component, Input, numberAttribute } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'rating-stars',
  templateUrl: 'rating-stars.component.html',
  styleUrl: 'rating-stars.component.scss',
  imports: [
    MatIconModule
  ],
  standalone: true
})

export class RatingStarsComponent {
  @Input({
    transform: numberAttribute,
    required: true
  })
  set rate(rate: number) {
    this.gradientStarsCount = Math.round(rate);
    this.greyStarsCount = 5 - this.gradientStarsCount;
  }

  gradientStarsCount = 0;
  greyStarsCount = 5;
}
