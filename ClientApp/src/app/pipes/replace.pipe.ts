import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace'
})
export class ReplacePipe implements PipeTransform {

  transform(value: string, regexValue: string, replaceValue: string): any {
    if(!value) return
    return value.replace(regexValue, replaceValue);
  }
}
