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
    length:any
    pIndex=0
    pSize=10

  constructor(private skuservice:SkusService,private _bottomSheet:MatBottomSheet) { }

  ngOnInit(): void {
    this.getSkus()
  }

  getSkus(){
    this.loadingIndicator=true
    this.skuservice.get("getAllSkus/?pageIndex="+this.pIndex+"&pageSize="+this.pSize).subscribe(res=>{
      console.log(res)
      var response:any = res
      this.skus=response.skus
      this.length = response.skusLength
      this.loadingIndicator=false
    })
  }

  EditSku(sku){
    // console.log(sku)
    var ref = this._bottomSheet.open(SkuEditSheetComponent,{data:sku})
    ref.afterDismissed().subscribe(res=>{
      this.getSkus()
    })
  }

  DeleteSku(sku){
    this.skuservice.deleteData(sku._id).subscribe(res=>{
      console.log(res)
      this.getSkus()
    })
  }

  changePageData(event){
    this.pSize=event.pageSize
    this.pIndex=event.pageIndex
    console.log(event)
    this.getSkus()
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
