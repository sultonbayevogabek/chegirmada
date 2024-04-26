import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function newPrice(controlNameToCompare: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    const form = control.parent as FormGroup;
    console.log('Form', form);

    if (form) {
      const controlToCompare = form.get(controlNameToCompare);

      console.log('Control', controlToCompare);

      if (controlToCompare && control.value && controlToCompare.value) {
        return +control.value < +controlToCompare.value ? null : { invalidNewPrice: true };
      }
    }

    return null
  };
}
