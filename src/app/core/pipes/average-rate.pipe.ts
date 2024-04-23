import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'averageRate',
  standalone: true
})

export class AverageRatePipe implements PipeTransform {
  transform({ rating1, rating2, rating3, rating4, rating5 }: {
    rating1: number;
    rating2: number;
    rating3: number;
    rating4: number;
    rating5: number;
  }): number {
    const totalRatesCount = rating1 + rating2 + rating3 + rating4 + rating5;
    if (!totalRatesCount) {
      return 0;
    }
    return (rating1 + rating2 * 2 + rating3 * 3 + rating4 * 4 + rating5 * 5) / (rating1 + rating2 + rating3 + rating4 + rating5);
  }
}
