import { LookupService } from './../../../services/lookup.service';
import { FilterTypeOrderStatusComponent } from './../filter-type-order-status/filter-type-order-status.component';
import { orderFilter } from '../custom-order-status/orderFilter';
import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'add-edit-custom-status-filter',
  templateUrl: './add-edit-custom-status-filter.component.html',
  styleUrls: ['./add-edit-custom-status-filter.component.scss']
})
export class AddEditCustomStatusFilterComponent implements OnInit {

  @Input() statusFilters:any;
  @Input() filterTypes:any;
  @Output() backClick:EventEmitter<any>=new EventEmitter<any>()
  selectedFilter:any;
  selectedFilterType:String;
  constructor() { }

  ngOnInit(): void {
  }

  backClicked(currAddedFilter?:any){
    if(!currAddedFilter){
      this.backClick.emit();
      return
    }
    let status={...currAddedFilter}
    status.filterName=this.selectedFilter;
    status.filterType=this.selectedFilterType;
    this.backClick.emit(status);
  }

  saveOrderStatusFilter(orderStatusFilter){
    debugger
    this.backClicked(orderStatusFilter)
  }



}
