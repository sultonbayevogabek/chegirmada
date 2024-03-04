import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber',
  standalone: true
})

export class PhoneNumberPipe implements PipeTransform {
  transform(value: string = ''): string {
    const phone = value?.replace(/ /gi, '');

    if (phone?.length < 13) {
      return phone || ''
    }

    return `${phone.slice(0, 4)} ${phone.slice(4, 6)}-${phone.slice(6, 9)}-${phone.slice(9, 11)}-${phone.slice(11, 13)}`
  }
}
