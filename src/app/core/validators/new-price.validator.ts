import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const newPrice: ValidatorFn = (
  formGroup: FormGroup
): ValidationErrors | null => {
  return +formGroup.get('discount_amount').value > +formGroup.get('price').value ? { invalidNewPrice: true } : null;
};
