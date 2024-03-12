import { FormControl, ValidationErrors } from '@angular/forms';

export function nameValidator(control: FormControl): ValidationErrors | null {
  const value: string = control.value;
  console.log('Value', value);
  const isValid = /^[A-Za-z']*$/i.test(value);
  return isValid ? null : { invalidName: true };
}
