import { FormControl, ValidationErrors } from '@angular/forms';

export function name(control: FormControl): ValidationErrors | null {
  const value: string = control.value;
  const isValid = /^[A-Za-z']*$/i.test(value);
  return isValid ? null : { invalidName: true };
}
