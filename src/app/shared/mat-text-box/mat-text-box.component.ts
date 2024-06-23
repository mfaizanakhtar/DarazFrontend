import { FormControl } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mat-text-box',
  templateUrl: './mat-text-box.component.html',
  styleUrls: ['./mat-text-box.component.scss']
})
export class MatTextBoxComponent implements OnInit {

  constructor() { }

  @Input() label:String;
  @Input() isNumber:Boolean;
  @Input() placeHolder:String;
  @Input() value:any;
  @Input() control:FormControl
  @Output() valueChange:EventEmitter<String> = new EventEmitter<String>();

  ngOnInit(): void {
  }

}
