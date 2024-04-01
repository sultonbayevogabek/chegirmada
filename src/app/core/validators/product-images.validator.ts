import { FormControl, ValidationErrors } from '@angular/forms';

export function productImages(control: FormControl): ValidationErrors | null {
  const value: string = control.value;

  if (value.length > 0 && value.length < 9) {
    return null
  }

  return { invalidProductImages: true}
}
