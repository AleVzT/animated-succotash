import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Labour } from '../models/labour.model';

@Injectable({
  providedIn: 'root'
})
export class LabourstatsService {

  private url = 'http://localhost:6502/application';
  data = []; 

  constructor(
    private http: HttpClient,
  ) { }

  getLabourstats() {
    return this.http.get(`${ this.url }/labourstats`)
    .pipe(
      map( resp => {
        return this.dataMap(resp[0]);
      })
    );
  }

  private dataMap( resp ) {

    const labourTotal = resp.total;
    const labourProviders = resp.providers;
    const labourDirectContractors = resp.directContractors;

    const workerTotal = labourTotal[0].workerCount;

    const labourData = labourProviders.concat(labourDirectContractors);
    
    labourData.forEach( element => {
      const labourTemp = {
        id: element.providerId,
        payroll_Providers: element.name,
        worker: element.workerCount,
        compliance: element.complianceStats ? element.complianceStats.Total : 0,
        grossPay: element.grossPayTotal,
        payAdmin: element.payrollAdminTotal,
        labourCost: element.labourCostTotal,
        workForce: (element.workerCount * 100) / workerTotal
      }
      this.data.push(labourTemp);      
    });
    
    const data = {
      total: labourTotal[0],
      data: this.data
    }

    return data;

  }

}
