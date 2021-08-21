import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { SkusService } from '../services/skus.service';
import { SkuEditSheetComponent } from '../sku-edit-sheet/sku-edit-sheet.component';

@Component({
  selector: 'app-sku-overview',
  templateUrl: './sku-overview.component.html',
  styleUrls: ['./sku-overview.component.css']
})
export class SkuOverviewComponent implements OnInit {
    //data
    skus:any
    //datatable variables
    ColumnMode = ColumnMode;
    loadingIndicator = false;
    SelectionType = SelectionType;
    selected=[];
    status:any

  constructor(private skuservice:SkusService,private _bottomSheet:MatBottomSheet) { }

  ngOnInit(): void {
    this.getSkus()
  }

  getSkus(){
    this.loadingIndicator=true
    this.skuservice.get("getAllSkus").subscribe(res=>{
      console.log(res)
      this.skus=res
      this.loadingIndicator=false
    })
  }

  EditSku(sku){
    // console.log(sku)
    this._bottomSheet.open(SkuEditSheetComponent,{data:sku})
  }

  onSelect({ selected }) {

    this.selected.splice(0, this.selected.length);
    for(const sel of selected){
      this.selected.push(sel);
    }
    console.log(this.selected)
  }

  onActivate(event) {
    // console.log('Activate Event', event);
  }

}
