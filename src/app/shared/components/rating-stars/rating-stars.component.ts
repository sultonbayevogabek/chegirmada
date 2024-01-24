import { Component, Input } from '@angular/core';

@Component({
  selector: 'rating-stars',
  templateUrl: 'rating-stars.component.html',
  styleUrls: [ 'rating-stars.component.scss' ],
  standalone: true
})

export class RatingStarsComponent {
  @Input() rate: number | string;
}
