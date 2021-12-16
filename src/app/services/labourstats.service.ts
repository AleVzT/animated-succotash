import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { LabourResponse } from '../models/labourResponse.model';

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
    return this.http.get<Array<LabourResponse>>(`${ this.url }/labourstats`)
    .pipe( map(response => response[0]));
  }
}
