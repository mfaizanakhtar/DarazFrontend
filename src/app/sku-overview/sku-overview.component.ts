import { Component, OnInit } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { SkusService } from '../services/skus.service';

@Component({
  selector: 'app-sku-overview',
  templateUrl: './sku-overview.component.html',
  styleUrls: ['./sku-overview.component.css']
})
export class SkuOverviewComponent implements OnInit {
    //data
    orders:any
    //datatable variables
    ColumnMode = ColumnMode;
    loadingIndicator = false;
    SelectionType = SelectionType;
    selected=[];
    status:any

  constructor(private skuservice:SkusService) { }

  ngOnInit(): void {
    this.getSkus()
  }

  getSkus(){
    this.skuservice.get("getAllSkus").subscribe(res=>{
      console.log(res)
    })
  }

  onSelect({ selected }) {

    this.selected.splice(0, this.selected.length);
    for(const sel of selected){
      this.selected.push(sel);
    }
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }

}
