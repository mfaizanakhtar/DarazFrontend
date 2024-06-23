import { FormControl } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mat-drop-down',
  templateUrl: './mat-drop-down.component.html',
  styleUrls: ['./mat-drop-down.component.scss']
})
export class MatDropDownComponent implements OnInit {

  constructor() { }

  @Input() label:String;
  @Input() displayKey:string;
  @Input() valueKey:string;
  @Input() selectedVal:String;
  @Input() hint:String
  _data:any[];
  @Input('data') 
  set dataValue(data:any){
    if(data?.length>0 && typeof data[0]==='string'){
      this._data = data.map(d=>{return {key:d,val:d}})
      this.valueKey="val";
      this.displayKey="key";
    }else{
      this._data=data
    } 
  }
  @Output() selectedValChange:EventEmitter<String>=new EventEmitter<String>();
  @Input() control:FormControl


  ngOnInit(): void {
    if(this.control==null){
      this.control = new FormControl(this.selectedVal);
    }
  }

}
