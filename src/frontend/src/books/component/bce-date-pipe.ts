import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bcedate',
})
export class BceDatePipe implements PipeTransform {
  transform(value: number): string {
    if (value < 0) {
      return (value * -1).toString() + ' BCE';
    } else {
      return value.toString() + ' CE';
    }
  }
}
