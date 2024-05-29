import { inject, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SHORT_MONTH_NAMES } from '../constants/months';
import { map, Observable } from 'rxjs';

@Pipe({
  name: 'datePipe',
  standalone: true
})

export class DatePipe implements PipeTransform {
  monthsShortNames = SHORT_MONTH_NAMES;

  private _translateService = inject(TranslateService);

  transform(d: string): Observable<string> {
    const date = new Date(d);
    const day = date.getDate();
    const month = date.getMonth();
    return this._translateService.get(this.monthsShortNames[month])
      .pipe(
        map(month => {
          return `${day} ${month}`;
        })
      )
  }
}
