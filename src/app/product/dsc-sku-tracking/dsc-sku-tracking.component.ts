import { DarazskuService } from '../../services/darazsku.service';
import { Component, OnInit } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DscSkuEditComponent } from '../dsc-sku-edit/dsc-sku-edit.component';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-inventory-tracking',
  templateUrl: './dsc-sku-tracking.component.html',
  styleUrls: ['./dsc-sku-tracking.component.scss']
})
export class DscSkuTracking implements OnInit {
    LoggedUser
    //data
    DSCskus:any
    StoreArray=[]
    //datatable variables
    ColumnMode = ColumnMode;
    loadingIndicator = true;
    loadingIndicatorValue=0
    costSavingIndiactor=false;
    SelectionType = SelectionType;
    sortedData=[];
    selected=[];
    //permissions
    userPermissions:any;

    searchTerm:any;
    pageSize:any=10;
    //Filter
    Store='All'
    SellerSku=null
    ShopSku=null
    Stock='InStock'
    StatusFilter='All'
    //pagination
    length:any
    pIndex=0
    pSize=10
    breadCrumbItems: Array<{}>;
    
    

  constructor(private darazskus:DarazskuService,private _bottomSheet:MatBottomSheet,private auth:AuthService) { }

  ngOnInit(): void {
    this.LoggedUser=this.auth.getCurrentUser()
    this.breadCrumbItems = [{ label: 'Home' }, { label: 'DSC Inventory', active: true },];

    this.getDarazSkus()
    this.userPermissions = this.auth.getPermissions();
    
  }

  changePage(page){
    this.DSCskus=[]
    this.pIndex=page-1
    this.getDarazSkus()
  }

  changePageSize(){
    this.DSCskus=[]
    this.getDarazSkus()
  }

  getDarazSkus(){
    var tempStore,tempStatus,tempStock;
    if(this.Store=='All') {tempStore=null} else{tempStore=this.Store}
    if(this.StatusFilter=='All') {tempStatus=null} else{tempStatus=this.StatusFilter}
    if(this.Stock=='All') {tempStock=null} else{tempStock=this.Stock}
    this.fetchProgress()

    this.darazskus.get('/getSkus?pSize='+this.pSize+'&pIndex='+this.pIndex+'&SellerSku='+this.SellerSku+'&ShopSku='+this.ShopSku+'&ShopShortCode='+tempStore+'&Status='+tempStatus
    +'&Stock='+tempStock).subscribe(res=>{
      console.log(res)

      var response:any=res

      this.DSCskus=response.darazskus
      this.sortedData=response.darazskus
      this.length=response.darazskusCount
      
      if(this.StoreArray.length==0) this.StoreArray=response.darazStores
      

      this.loadingIndicator=false
    })
  }

  StoreSelected(event){
    this.DSCskus=[]
    this.pIndex=0
    console.log(this.Store)
    this.getDarazSkus()
  }

  fetchProgress(){
    this.loadingIndicator=true
    this.loadingIndicatorValue=0
    setInterval(()=>{
      if(this.loadingIndicatorValue!=95)
      this.loadingIndicatorValue=this.loadingIndicatorValue+5
    },50)
  }

  findSku(f){
    debugger
    this.pIndex=0
    console.log(f)
    if(f.SellerSku=='') this.SellerSku=null
    else this.SellerSku=f.SellerSku
    
    if(f.ShopSku=='') this.ShopSku=null
    else this.ShopSku=f.ShopSku

    this.getDarazSkus()
  }

  StatusFilterClicked(filter){
    this.StatusFilter=filter
    this.DSCskus=[]
    this.pIndex=0
    this.getDarazSkus()
  }

  StockFilterClicked(filter){
    this.Stock=filter
    this.DSCskus=[]
    this.pIndex=0
    this.getDarazSkus()
  }

  EditCost(pop,sku){
    debugger
    console.log(sku._id)
    var skuCost={cost:0,FBMpackagingCost:0,FBDpackagingCost:0};
    if(sku.cost!=null) skuCost.cost=sku.cost;
    if(sku.FBMpackagingCost!=null) skuCost.FBMpackagingCost=sku.FBMpackagingCost;
    if(sku.FBDpackagingCost!=null) skuCost.FBDpackagingCost=sku.FBDpackagingCost;

    this.costSavingIndiactor=true
    this.darazskus.updateData('',sku._id,skuCost).subscribe(res=>{
      this.costSavingIndiactor=false
      this.getDarazSkus()
      pop.close();
    })
    
  }
  

  // EditSku(row){
  //   var ref = this._bottomSheet.open(DscSkuEditComponent,{data:{sku:row,FBDchange:0,FBMchange:0}})
  //   ref.afterDismissed().subscribe(res=>{
  //     this.getDarazSkus()
  //   })
  //   // console.log(row)
  // }

  // AcceptChange(row){
  //   var ref = this._bottomSheet.open(DscSkuEditComponent,{data:{sku:row,
  //     FBDchange:row.fblWarehouseInventories.quantity-row.FBDstock.quantity,
  //     FBMchange:row.multiWarehouseInventories.quantity-row.FBMstock.quantity}})

  //   ref.afterDismissed().subscribe(res=>{
  //     this.getDarazSkus()
  //   })
  // }

  DeleteSku(row){
    console.log(row)
    // this.darazskus.deleteData('/'+row._id).subscribe(res=>{
    //   console.log(row)
    //   this.getDarazSkus()
    // })
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#ff3d60',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        this.darazskus.deleteData('/'+row._id).subscribe(res=>{
          Swal.fire('Deleted!', 'Your sku has been deleted.', 'success').then(result=>{
            this.getDarazSkus()
          });
        })
        
      }
    });

  }

  sortData(sort: Sort) {
    var data = this.DSCskus.slice()
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'quantity':
          return this.compare(a.quantity, b.quantity, isAsc);
        case 'multiWarehouseInventories.quantity':
          return this.compare(a.multiWarehouseInventories.quantity, b.multiWarehouseInventories.quantity, isAsc);
        case 'fblWarehouseInventories.quantity':
          return this.compare(a.fblWarehouseInventories.quantity, b.fblWarehouseInventories.quantity, isAsc);
        case 'cost':
          return this.compare(a.cost, b.cost, isAsc);
        case 'SellerSku':
          return this.compare(a.SellerSku, b.SellerSku, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  //ngx-datatable
  // onSelect({ selected }) {

  //   this.selected.splice(0, this.selected.length);
  //   for(const sel of selected){
  //     this.selected.push(sel);
  //   }
  //   console.log(this.selected)
  // }

  // onActivate(event) {
  //   // console.log('Activate Event', event);
  // }




}
