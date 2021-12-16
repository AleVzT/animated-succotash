import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent }   from './app.component';
import { TableSortingComponent } from './components/table-sorting/table-sorting.component';
import { LabourPercentPipe } from './pipes/labour-percent.pipe';
import { LabourNumberPipe } from './pipes/labour-number.pipe';
import { SortingComponent } from './components/sorting/sorting.component';

@NgModule({
  declarations: [
    AppComponent,
    TableSortingComponent,
    LabourPercentPipe,
    LabourNumberPipe,
    SortingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
