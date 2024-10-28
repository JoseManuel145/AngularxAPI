import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})

export class PricePipe implements PipeTransform {
  transform(value: number, currency: string = '$'): string {
    if (value == null || isNaN(value)) {
      return ''; // Devuelve vacío si el valor no es válido
    }else if(value > 100){
      currency = '&'
      return `${currency} ${value.toFixed(2)}`
    }
    return `${currency} ${value.toFixed(2)}`; // Formatear el precio a dos decimales
  }
}