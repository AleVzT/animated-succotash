import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";

import { LabourstatsService } from 'src/app/services/labourstats.service';
import { Labour } from 'src/app/models/labour.model';
import { LabourResponse } from 'src/app/models/labourResponse.model';
import { Sort } from '../sorting/sorting.component';

@Component({
  selector: 'app-table-sorting',
  templateUrl: './table-sorting.component.html',
  styleUrls: ['./table-sorting.component.css']
})

export class TableSortingComponent implements OnInit{

  private labourData: Observable<LabourResponse>;
  dataTable: Labour[] = [];
  total: Labour[] = [
    new Labour()
  ];
  dataTableRows: Labour[] = [];
  sortColumn = 1;


  constructor(
    private labourService: LabourstatsService
  ) {
    this.labourData = this.labourService.getLabourstats();
  }

  ngOnInit() {
    this.labourData.subscribe(() => this.sortByPayrollProvider(Sort.DESC))
  }

 sortByPayrollProvider(sortDirec: string) {
  const sortFn = (a: Labour, b: Labour) => sortDirec === Sort.ASC ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
  this.labourData.subscribe(labour => {
    this.dataTableRows = labour.directContractors;
    this.dataTable = labour.providers.sort(sortFn);
    this.total = labour.total;
    this.sortColumn = 1;
  });
}

sortByWorker(sortDirec: string) {
  const sortFn = (a: Labour, b: Labour) => sortDirec === Sort.ASC ? a.workerCount - b.workerCount : b.workerCount - a.workerCount;
  this.labourData.subscribe(labour => {
    this.dataTableRows = [];
    this.dataTable = [...labour.directContractors, ...labour.providers].sort(sortFn);
    this.sortColumn = 2;
  });
}

sortByComplianceScore(sortDirec: string) {
  const sortFn = (a: Labour, b: Labour) => sortDirec === Sort.ASC ? this.computeComplianceScore(a) - this.computeComplianceScore(b) : this.computeComplianceScore(b) - this.computeComplianceScore(a);
  this.labourData.subscribe(labour => {
    this.dataTableRows = [];
    this.dataTable = [...labour.directContractors, ...labour.providers].sort(sortFn);
    this.sortColumn = 3;
  });
}

sortByGrossPay(sortDirec: string) {
  const sortFn = (a: Labour, b: Labour) => sortDirec === Sort.ASC ? a.grossPayTotal - b.grossPayTotal : b.grossPayTotal - a.grossPayTotal;
  this.labourData.subscribe(labour => {
    this.dataTableRows = [];
    this.dataTable = [...labour.directContractors, ...labour.providers].sort(sortFn);
    this.sortColumn = 4;
  });
}

sortByPayrollAdmin(sortDirec: string) {
  const sortFn = (a: Labour, b: Labour) => sortDirec === Sort.ASC ? a.payrollAdminTotal - b.payrollAdminTotal : b.payrollAdminTotal - a.payrollAdminTotal;
  this.labourData.subscribe(labour => {
    this.dataTableRows = [];
    this.dataTable = [...labour.directContractors, ...labour.providers].sort(sortFn);
    this.sortColumn = 5;
  });
}

sortByLabourCost(sortDirec: string) {
  const sortFn = (a: Labour, b: Labour) => sortDirec === Sort.ASC ? a.labourCostTotal - b.labourCostTotal : b.labourCostTotal - a.labourCostTotal;
  this.labourData.subscribe( labour => {
    this.dataTableRows = [];
    this.dataTable = [...labour.directContractors, ...labour.providers].sort(sortFn);
    this.sortColumn = 6;
  });
}

sortByWorkForce(sortDirec: string) {
  const sortFn = (a: Labour, b: Labour) => sortDirec === Sort.ASC ? this.computeWorkForce(a) - this.computeWorkForce(b) : this.computeWorkForce(b) - this.computeWorkForce(a);
  this.labourData.subscribe(labour => {
    this.dataTableRows = [];
    this.dataTable = [...labour.directContractors, ...labour.providers].sort(sortFn);
    this.sortColumn = 7;
  });
}

computeComplianceScore(labour: Labour) {
  return labour.complianceStats ? labour.complianceStats.Total / 100 : 0;
}

computeWorkForce(labour: Labour) {
  return (labour.workerCount / this.total[0].workerCount);
}

formatColumn(columnId: number, borderColumn = false, textBig = false, textRight = false) {
  return {
    'border-right': borderColumn,
    'text-darker': this.sortColumn === columnId,
    'text-big': textBig,
    'text-right': textRight
  };
}
 
}
