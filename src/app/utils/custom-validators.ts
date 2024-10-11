import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function nameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valid = /^[A-Za-zÀ-ÖØ-öø-ÿ '-]+$/.test(control.value);
    return valid ? null : { invalidName: true };
  };
}
