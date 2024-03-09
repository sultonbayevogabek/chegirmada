import { Pipe, PipeTransform } from '@angular/core';
import { language } from '../models/language.model';

@Pipe({
  name: 'showByLang',
  standalone: true
})

export class ShowByLangPipe implements PipeTransform {
  transform(value: any, activeLang: language, keyUz = 'name_uz', keyRu = 'name_ru'): string {
    if (value && value[keyUz] && activeLang === 'uz') {
      return value[keyUz];
    }

    if (value && value[keyRu] && activeLang === 'ru') {
      return value[keyRu];
    }

    return ''
  }
}



