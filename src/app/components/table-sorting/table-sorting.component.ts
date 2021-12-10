import { Component, OnInit } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { LabourstatsService } from 'src/app/services/labourstats.service';

@Component({
  selector: 'app-table-sorting',
  templateUrl: './table-sorting.component.html',
  styleUrls: ['./table-sorting.component.css']
})
export class TableSortingComponent implements OnInit {

  labour: any;
  labourTotal: any;
  labourTemp: any;

  constructor(
    private labourService: LabourstatsService
  ) { }

  ngOnInit() {

    this.labourService.getLabourstats()
      .subscribe( result => {
        this.labour = result.data;
        this.labourTotal = result.total
    });
    

  };


  customSort(event: SortEvent) {

      if(event.field == 'payroll_Providers') {
        const index = this.labour.findIndex( element => element.id === 0);
        if ( index !== -1 )
          this.labourTemp = this.labour.splice(index, 1);      
      }

      event.data.sort((data1, data2) => {
        let value1 = data1[event.field];
        let value2 = data2[event.field];
        let result = null;

        if (value1 == null && value2 != null)
        result = -1;
        else if (value1 != null && value2 == null)
        result = 1;
        else if (value1 == null && value2 == null)
        result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
        else
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
        
        return (event.order * result);
      });
      if(event.field == 'payroll_Providers') 
        this.labour.unshift(this.labourTemp[0]);

  }

}
