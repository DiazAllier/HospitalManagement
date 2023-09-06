import { Component } from '@angular/core';
import { AbstractControl } from '@angular/forms';

export function ssnInputValidator(control: AbstractControl): {[key: string]: any} | null {
  const ssn = control.value;
  if(!ssn) { return null; }

  const ssnRegEx = /^\d{3}-\d{2}-\d{4}$/;  
  const valid = ssnRegEx.test(ssn);

  return valid ?  null : { invalidSSN : true };
}