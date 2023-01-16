import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'filter-type-date-range',
  templateUrl: './filter-type-date-range.component.html',
  styleUrls: ['./filter-type-date-range.component.scss']
})
export class FilterTypeDateRangeComponent implements OnInit {
  dateRangeFilter:{value:{greaterThan:Number,lesserThan:Number},displayedVal:String}={value:{greaterThan:0,lesserThan:0},displayedVal:''}
  dateRangeFormGroup=new FormGroup({
    greaterThan:new FormControl('',[Validators.required,this.rangeLimit]),
    lesserThan:new FormControl('',[Validators.required,this.rangeLimit])
  })
  @Output() orderStatusChange:EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  rangeLimit(control:AbstractControl){
    debugger
    if(!control.parent) return null;
    if(parseInt(control.parent.get('greaterThan')?.value) <= parseInt(control.parent.get('lesserThan')?.value)){
      return {custom:'GreaterThan value must be Greater Than lesserThan Value'}
    }
    else if((control.parent.get('greaterThan')?.value - control.parent.get('lesserThan')?.value)>90){
      return {custom:'Days Range Maximum Must Be 90 Days'}
    }
    else{
      if(control.parent.get('lesserThan')?.errors?.custom==control.parent.get('greaterThan')?.errors?.custom){
        control.parent.get('lesserThan').setErrors(null)
        control.parent.get('greaterThan').setErrors(null)
      }
      return null
    } 

  }

  saveClick(){
    debugger
    if(!this.dateRangeFormGroup.invalid){
      let greaterVal = this.dateRangeFormGroup.get('greaterThan').value;
      let lesserVal = this.dateRangeFormGroup.get('lesserThan').value;
      this.dateRangeFilter.displayedVal= 'Greater Than '+greaterVal+' Days and Lesser Than '+lesserVal+' Days.'
      this.dateRangeFilter.value.greaterThan=greaterVal;
      this.dateRangeFilter.value.lesserThan=lesserVal;
      this.orderStatusChange.emit(this.dateRangeFilter);
    }
  }

}
