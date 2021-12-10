import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'labourPercent'
})
export class LabourPercentPipe implements PipeTransform {

  transform(value: number,  ...args: unknown[]): string {

    let resp: string;

    if( args[0] == '0' ){
      resp = `${value.toFixed(0)} %`
    } else {
      resp = `${value.toFixed(1)} %`
    }

    return resp;
  }

}
