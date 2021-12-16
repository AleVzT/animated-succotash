import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css']
})
export class SortingComponent implements OnInit {

  @Input() active: boolean = false;
  @Output() onShift = new EventEmitter<string>();

  constructor() {
  }

  Sort = Sort.DESC;

  get caret() {
    return this.Sort === Sort.ASC ? '<i class="fas fa-angle-down"></i>' : '<i class="fas fa-angle-up"></i>';
  }

  shiftSortDirection() {
    this.Sort = this.Sort === Sort.ASC ? Sort.DESC : Sort.ASC;
    this.onShift.emit(this.Sort);
  }

  ngOnInit(): void {
  }

}

export class Sort {
  static ASC = 'asc';
  static DESC = 'desc';
}
