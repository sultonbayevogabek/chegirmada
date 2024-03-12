import { FormControl, ValidationErrors } from '@angular/forms';

export function shortnameValidator(control: FormControl): ValidationErrors | null {
  const value: string = control.value;
  const isValid = new RegExp("^[a-zA-Z][a-zA-Z0-9_]*$").test(value);
  return isValid ? null : { invalidShortname: true };
}
