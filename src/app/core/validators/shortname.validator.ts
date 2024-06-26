import { FormControl, ValidationErrors } from '@angular/forms';

export function shortname(control: FormControl): ValidationErrors | null {
  const value: string = control.value;
  const isValid = new RegExp("^[a-zA-Z][a-zA-Z0-9_]*$").test(value) && !value?.match(/__/g);
  return isValid ? null : { invalidShortname: true };
}
