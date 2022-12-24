import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomOrderStatusService } from './../../../services/custom-order-status.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'filter-type-order-status',
  templateUrl: './filter-type-order-status.component.html',
  styleUrls: ['./filter-type-order-status.component.scss']
})
export class FilterTypeOrderStatusComponent implements OnInit {

  orderStatusFilter:{isNot:Boolean,value:String,displayedVal:String}={isNot:null,value:null,displayedVal:''}
  allStatuses:[String]
  @Output() orderStatusChange:EventEmitter<any> = new EventEmitter<any>();
  orderFilterFormGroup = new FormGroup({
    isNotControl:new FormControl('',[Validators.required]),
    orderStatusControl:new FormControl('',[Validators.required])
  })
  constructor(private customOrderService:CustomOrderStatusService) { }

  ngOnInit(): void {
    this.getOrderStatuses()
  }

  saveClick(){
    if(!this.orderFilterFormGroup.invalid){
      this.orderStatusFilter.displayedVal= (this.orderStatusFilter.isNot==true ? 'NOT'+' ' : '')+this.orderStatusFilter.value
      this.orderStatusChange.emit(this.orderStatusFilter);
    }
  }

  getOrderStatuses(){
    this.customOrderService.get('/getAllDarazOrderStatuses').subscribe((res:any)=>{
      debugger
      this.allStatuses=res.statuses
    })
  }
}
