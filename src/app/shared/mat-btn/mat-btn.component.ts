import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mat-btn',
  templateUrl: './mat-btn.component.html',
  styleUrls: ['./mat-btn.component.scss']
})
export class MatBtnComponent implements OnInit {

  @Input() btnLabel:String;
  @Output() btnClick:EventEmitter<any>=new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
