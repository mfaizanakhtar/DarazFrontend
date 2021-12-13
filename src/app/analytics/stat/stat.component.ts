import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {

  @Input() title: string;
  @Input() value: any;
  @Input() extraValue: any;
  @Input() icon: string;
  @Input() bottomContent: string;
  @Input() bottomContentExtra:string;
  @Input() popLabels:any;
  @Input() popData:any;

  constructor() { }

  ngOnInit(): void {
    
  }

}
