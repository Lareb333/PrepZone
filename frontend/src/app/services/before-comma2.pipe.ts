import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'beforeComma2'
})
export class BeforeCommaPipe2 implements PipeTransform {
  transform(value: string): string {
    if (value && value.includes(',')) {
      return value.split(',')[0];
    }
    return value;
  }
}
