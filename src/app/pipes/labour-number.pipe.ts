import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'labourNumber'
})
export class LabourNumberPipe implements PipeTransform {

  transform(value: number,  ...args: unknown[]): string {

    let valueTemp: string;

    valueTemp = value.toString();
    valueTemp = valueTemp.slice(0, -2);
    const resp = parseInt(valueTemp).toLocaleString('en-US');

    return resp;
  }

}