import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'view-status-filters',
  templateUrl: './view-status-filters.component.html',
  styleUrls: ['./view-status-filters.component.scss']
})
export class ViewStatusFiltersComponent implements OnInit {

  @Input() data:any=[]
  @Output() filterDeleted:EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  delete(rowIndex){
    this.filterDeleted.emit(rowIndex)
  }

}
