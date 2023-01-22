import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'filter-type-order-payout',
  templateUrl: './filter-type-order-payout.component.html',
  styleUrls: ['./filter-type-order-payout.component.scss']
})
export class FilterTypeOrderPayoutComponent implements OnInit {

  orderPayoutFilter:{value:{type:String,val:Number},displayedVal:String}={value:{type:null,val:null},displayedVal:''}
  _lesserGreaterEqualsDD=['\>\=','\<\=','\=']
  @Output() orderStatusChange:EventEmitter<any> = new EventEmitter<any>();
  orderPayoutGroup = new FormGroup({
    equalLessGreater:new FormControl('',[Validators.required]),
    value:new FormControl('',[Validators.required,this.NumberValidation])
  })
  constructor() { }

  ngOnInit(): void {
  }

  NumberValidation(control:AbstractControl){
    debugger
    if(control.value){
      if(isNaN(control.value)) return {custom:'Must Be A Valid Number'}
      else null
    }else{
      return null;
    }
  }

  saveClick(){
    debugger
    if(!this.orderPayoutGroup.invalid){
      this.orderPayoutFilter.value.type=this.orderPayoutGroup.get('equalLessGreater').value;
      this.orderPayoutFilter.value.val=this.orderPayoutGroup.get('value').value;
      this.orderPayoutFilter.displayedVal='Order Payout '+this.orderPayoutGroup.get('equalLessGreater').value+this.orderPayoutGroup.get('value').value
      this.orderStatusChange.emit(this.orderPayoutFilter);
    }
  }

}
