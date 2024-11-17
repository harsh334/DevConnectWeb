import { AbstractControl, ValidationErrors } from '@angular/forms';

export function checkIfEmpty(
  control: AbstractControl
): ValidationErrors | null {
  if (control.value !== null && typeof control.value === 'string') {
    const trimmedValue = control.value.trim();
    if (trimmedValue.length === 0) {
      return { checkIfEmpty: true };
    }
  }
  return null;
}
