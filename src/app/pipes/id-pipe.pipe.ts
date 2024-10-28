import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idPipe'
})

export class idPipe implements PipeTransform {
  transform(value: number, currency: string = '#'): string {
    if (value == null || isNaN(value)) {
      return '';
    }
    return `${currency} ${value.toFixed(2)}`;
  }
}