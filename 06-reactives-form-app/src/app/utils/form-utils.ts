import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

async function sleep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2500);
  });
}

export class FormUtils {
  // regular expresion

  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return (
      !!form.controls[fieldName].errors && form.controls[fieldName].touched
    );
  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  private static getErrors(errors: ValidationErrors): string | null {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This field is required';

        case 'minlength':
          return `At least ${errors['minlength'].requiredLength}`;

        case 'min':
          return `Min value of ${errors['min'].min}`;

        case 'pattern':
          return 'Must be a valid email';

        case 'emailTaken':
          return 'Email already exist';

        case 'noStrider':
          return 'Username cant be Strider';

        default:
          return 'Validation error unhandled';
      }
    }
    return null;
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) {
      return null;
    }

    const errors = form.controls[fieldName].errors ?? {};

    return this.getErrors(errors);
  }

  static getFieldErrorInArray(
    formArray: FormArray,
    index: number
  ): string | null {
    if (formArray.controls.length === 0) {
      return null;
    }

    const errors = formArray.controls[index].errors ?? {};

    return this.getErrors(errors);
  }

  static isPasswordMatching(field1: string, field2: string) {
    return (formGroup: AbstractControl) => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;
      return field1Value === field2Value
        ? null
        : {
            passwordNotEqual: true,
          };
    };
  }

  static async chequingServerResponse(
    control: AbstractControl
  ): Promise<ValidationErrors | null> {
    console.log('Validando desde el servidor');

    await sleep();

    const formValue = control.value;

    if (formValue === 'hola@mundo.com') {
      return {
        emailTaken: true,
      };
    }

    return null;
  }

  static noStrider(control: AbstractControl): ValidationErrors | null {
    const formValue: string = control.value;

    return formValue.toLowerCase() === 'strider' ? { noStrider: true } : null;
  }
}
