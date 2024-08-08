import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const newPrice: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const formGroup = control.parent as FormGroup; // Access the parent FormGroup

  if (!formGroup) {
    return null; // Handle case where control doesn't have a parent FormGroup
  }

  const discountAmount = formGroup.get('discount_amount');
  const price = formGroup.get('price');

  if (!discountAmount || !price) {
    return null; // Handle case where controls are null
  }

  return +discountAmount?.value > +price?.value ? { invalidNewPrice: true } : null;
};
