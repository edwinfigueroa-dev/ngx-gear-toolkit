import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import {
  onlyLetters,
  onlyNumbers,
  emailFormat,
  onlyAlphanumeric,
  onlyUppercase,
  onlyLowercase,
  hasForbiddenSpecialChars,
  hasUppercase,
  hasLowercase,
  hasNumber,
  hasSpecial,
  areEquals,
} from '@lib/utils';

export const numbersValidator = (allowedSpecialChars: string = ''): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    return onlyNumbers(control.value, allowedSpecialChars) ? null : { invalidNumber: true };
  };
};

export const lettersValidator = (allowedSpecialChars: string = ''): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    return onlyLetters(control.value, allowedSpecialChars) ? null : { invalidLetters: true };
  };
};

export const emailValidator = (allowedSpecialChars: string = ''): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    return emailFormat(control.value, allowedSpecialChars) ? null : { invalidEmail: true };
  };
};

export const alphanumericValidator = (allowedSpecialChars: string = ''): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    return onlyAlphanumeric(control.value, allowedSpecialChars) ? null : { invalidAlphanumeric: true };
  };
};

export const uppercaseValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (!control.value) return null;
  return onlyUppercase(control.value) ? null : { invalidUppercase: true };
};

export const lowercaseValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (!control.value) return null;
  return onlyLowercase(control.value) ? null : { invalidLowercase: true };
};

export const forbiddenSpecialCharsValidator = (forbiddenSpecialChars: string): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;
    return !hasForbiddenSpecialChars(value, forbiddenSpecialChars) ? null : { invalidForbiddenspecialChars: true };
  };
};

export interface Options {
  minLength?: number;
  maxLength?: number;
  upper?: boolean;
  lower?: boolean;
  number?: boolean;
  conteinSpecialChar?: boolean;
  allowedSpecialChars?: string;
}

export interface DynamicValidatorResponse {
  invalidMinLength?: boolean;
  invalidMaxLength?: boolean;
  invalidUppercase?: boolean;
  invalidLowercase?: boolean;
  invalidNumber?: boolean;
  invalidSpecialChars?: boolean;
  invalidCharsAllowed?: boolean;
}

export const dynamicValidator = (options: Options): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const errors: DynamicValidatorResponse = {};

    // 1. Validación de longitud
    if (options.minLength && value.length < options.minLength) errors.invalidMinLength = true;
    if (options.maxLength && value.length > options.maxLength) errors.invalidMaxLength = true;

    // 2. Validación de presencia (Seguridad)
    if (options.upper && !hasUppercase(value)) errors.invalidUppercase = true;
    if (options.lower && !hasLowercase(value)) errors.invalidLowercase = true;
    if (options.number && !hasNumber(value)) errors.invalidNumber = true;
    
    // 3. Validación de caracteres especiales (Contener al menos uno)
    if (options.conteinSpecialChar && !hasSpecial(value)) errors.invalidSpecialChars = true;

    // 4. Validación de caracteres permitidos (Restricción)
    // Si definiste allowedSpecialChars, validamos que NO haya caracteres fuera de esa lista
    if (options.allowedSpecialChars) {
      // Reutilizamos la lógica de isOnlyAlphanumeric pasándole los caracteres extra permitidos
      // Si el valor tiene algo que no es alfa-numérico ni está en tu lista, es un error.
      if (!onlyAlphanumeric(value, options.allowedSpecialChars)) errors.invalidCharsAllowed = true;
    }

    return Object.keys(errors).length > 0 ? errors : null;
  };
};

export interface MatchValidatorResponse {
  invalidMatch?: boolean;
}

export const matchValidator = (controlName: string, matchingControlName: string): ValidatorFn => {
  return (group: AbstractControl): ValidationErrors | null => {
    // En este caso, 'group' es el FormGroup padre
    const control = group.get(controlName);
    const matchingControl = group.get(matchingControlName);

    // Si los controles no existen, terminamos
    if (!control || !matchingControl) return null;

    // Si el control de confirmación ya tiene otros errores (como required), 
    // no pisamos esos errores con el de comparación
    if (matchingControl.errors && !matchingControl.errors['invalidMatch']) return null;

    // Usamos la lógica pura para comparar
    const isMatch = areEquals(control.value, matchingControl.value);

    if (!isMatch) {
      const error: MatchValidatorResponse = { invalidMatch: true };
      // Aplicamos el error directamente al campo de confirmación
      matchingControl.setErrors(error);
      return error;
    } else {
      // Si coinciden, limpiamos el error específico de este validador
      matchingControl.setErrors(null);
      return null;
    }
  };
};

//* TODO: REVISAR 
// Cuando se usa el de tipo control se tiene que validar los cambios de valor del control de referencia ejemplo: 
// export class MyComponent {
//   password = new FormControl('', [Validators.required]);
//   confirmPassword = new FormControl('', [
//     Validators.required, 
//     matchControlValidator(this.password) // <--- Referencia directa
//   ]);
//   constructor() {
//     this.password.valueChanges.subscribe(() => {
//       this.confirmPassword.updateValueAndValidity(); // <--- Actualiza la validación por los cambios de la referencia
//     });
//   }
// }
// */
export const matchControlValidator = (otherControl: AbstractControl): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const isMatch = areEquals(control.value, otherControl.value);
    return isMatch ? null : { invalidMatch: true };
  };
};
