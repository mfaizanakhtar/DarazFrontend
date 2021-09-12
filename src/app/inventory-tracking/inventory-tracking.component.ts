import { DarazskuService } from './../darazsku.service';
import { Component, OnInit } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-inventory-tracking',
  templateUrl: './inventory-tracking.component.html',
  styleUrls: ['./inventory-tracking.component.css']
})
export class InventoryTrackingComponent implements OnInit {
    //data
    DSCskus:any
    StoreArray=[]
    //datatable variables
    ColumnMode = ColumnMode;
    loadingIndicator = true;
    SelectionType = SelectionType;
    selected=[];
    //Filter
    Store='All'
    SellerSku=null
    ShopSku=null
    Stock='InStock'
    StatusFilter='active'
    //pagination
    length:any
    pIndex=0
    pSize=10
    
    

  constructor(private darazskus:DarazskuService) { }

  ngOnInit(): void {
    this.getDarazSkus()
  }

  changePageData(event){
    this.pSize=event.pageSize
    this.pIndex=event.pageIndex
    console.log(event)
    this.getDarazSkus()
  }

  getDarazSkus(){
    var tempStore,tempStatus,tempStock;
    if(this.Store=='All') {tempStore=null} else{tempStore=this.Store}
    if(this.StatusFilter=='All') {tempStatus=null} else{tempStatus=this.StatusFilter}
    if(this.Stock=='All') {tempStock=null} else{tempStock=this.Stock}
    this.loadingIndicator=true
    this.DSCskus=[]

    this.darazskus.get('/getSkus?pSize='+this.pSize+'&pIndex='+this.pIndex+'&SellerSku='+this.SellerSku+'&ShopSku='+this.ShopSku+'&ShopId='+tempStore+'&Status='+tempStatus
    +'&Stock='+tempStock).subscribe(res=>{
      console.log(res)

      var response:any=res

      this.DSCskus=response.darazskus
      this.length=response.darazskusCount
      
      if(this.StoreArray.length==0) this.StoreArray=response.darazStores
      

      this.loadingIndicator=false
    })
  }

  StoreSelected(event){
    this.pIndex=0
    console.log(this.Store)
    this.getDarazSkus()
  }

  findSku(f){
    this.pIndex=0
    console.log(f)
    if(f.SellerSku=='') this.SellerSku=null
    else this.SellerSku=f.SellerSku
    
    if(f.ShopSku=='') this.ShopSku=null
    else this.ShopSku=f.ShopSku

    this.getDarazSkus()
  }

  StatusFilterClicked(){
    this.pIndex=0
    this.getDarazSkus()
  }

  StockFilterClicked(){
    this.pIndex=0
    this.getDarazSkus()
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
