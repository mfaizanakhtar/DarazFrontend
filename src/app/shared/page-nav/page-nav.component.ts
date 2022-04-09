import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-page-nav',
  templateUrl: './page-nav.component.html',
  styleUrls: ['./page-nav.component.scss']
})
export class PageNavComponent implements OnInit {
  @Input() pageNav:any;
  @Input() selectedPageNav:Number
  @Output() navClick = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  
  pageNavClicked(item){
    this.navClick.emit(item)
  }

}
