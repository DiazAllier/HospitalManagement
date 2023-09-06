import { Component } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
@Component({
  selector: 'app-validation-match',
  template: '<h1>Validation</h1>'
})
export class ValidationMatch {

  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }

}
