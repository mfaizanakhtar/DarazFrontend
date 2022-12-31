import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'filter-type-custom-order-status',
  templateUrl: './filter-type-custom-order-status.component.html',
  styleUrls: ['./filter-type-custom-order-status.component.scss']
})
export class FilterTypeCustomOrderStatusComponent implements OnInit {
  orderStatusFilter:{currentOther:String,isNot:Boolean,value:String,displayedVal:String}={currentOther:null,isNot:null,value:null,displayedVal:''}
  orderFilterFormGroup = new FormGroup({
    currentOther:new FormControl('',Validators.required),
    isNotControl:new FormControl('',[this.otherTypeRequiredValidation]),
    orderStatusControl:new FormControl('',[this.otherTypeRequiredValidation])
  })
  @Output() orderStatusChange:EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  saveClick(){
    debugger
    if(!this.orderFilterFormGroup.invalid){
      if(this.orderStatusFilter.currentOther.toLowerCase()=='current') {
        this.orderStatusFilter.displayedVal='CURRENT';
        this.orderStatusFilter.isNot=false;
      }
      else this.orderStatusFilter.displayedVal= (this.orderStatusFilter.isNot==true ? 'NOT'+' ' : '')+this.orderStatusFilter.value
      this.orderStatusChange.emit(this.orderStatusFilter);
    }
  }

  otherTypeRequiredValidation(control:AbstractControl){
    debugger
    if(!control.parent) return null;
    if(control.parent.get('currentOther')?.value.toLowerCase()=='other'){
      if(control.value==null || control.value==undefined) return {required:true}
      else null
    }else{
      return null;
    }
  }

  currentOtherChange(value){
    if(value?.toLowerCase()=='current'){
      this.orderFilterFormGroup.get('isNotControl').setErrors(null)
      this.orderFilterFormGroup.get('orderStatusControl').setErrors(null)
    }
  }

}
