import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { DarazskuService } from '../../services/darazsku.service';
import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
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
    //loading
    loadingIndicator:Boolean = true;
    loadingIndicatorValue=0
    costSavingIndiactor:Boolean=false;
    quantitySavingIndicator:Boolean=false;
    priceSavingIndicator:Boolean=false;
    //tableVariables
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
    //popOver
    openedPricePop:any;

    breadCrumbItems: Array<{}>;
    priceEditFormGroup = new FormGroup({
      priceControl:new FormControl('',[Validators.required,Validators.pattern('^[1-9]+[0-9]*$')]),
      specialPriceControl:new FormControl('',[this.specialPriceValidation,Validators.pattern('^[1-9]+[0-9]*$')]),
      specialPriceFromControl:new FormControl(''),
      specialPriceToControl:new FormControl('')
    })
    
  constructor(private darazskus:DarazskuService,private _bottomSheet:MatBottomSheet,private auth:AuthService) { }

  ngOnInit(): void {
    this.LoggedUser=this.auth.getCurrentUser()
    this.breadCrumbItems = [{ label: 'Home' }, { label: 'DSC Inventory', active: true },];

    this.getDarazSkus()
    this.userPermissions = this.auth.getPermissions();

    this.priceEditFormGroup.get('priceControl').valueChanges
    .subscribe(()=>{
      this.priceEditFormGroup.get('specialPriceControl').updateValueAndValidity();
    })
    
  }

  specialPriceValidation(formControl:AbstractControl){
    if(!formControl.parent) return null;
    return formControl.value >= formControl.parent.get('priceControl').value ?
    {specialPriceInvalid:true} : null
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
    +'&Stock='+tempStock).subscribe((response:any)=>{
      console.log(response)

      this.DSCskus=response.darazskus
      this.sortedData=response.darazskus
      this.length=response.darazskusCount
      
      if(this.StoreArray.length==0) this.StoreArray=response.darazStores
      

      this.loadingIndicator=false
    })
  }

  setSkuSpecialPrice(value,DSCSkuIndex){
    if(!(value>0)){
      this.DSCskus[DSCSkuIndex].special_price=null;
    }
  }

  updatePrice(index,values,pricePopUp){
    if(this.priceEditFormGroup.valid){
      this.priceSavingIndicator=true;
      this.darazskus.updateData('updatePriceQuantity',this.DSCskus[index]._id,
      {
        price:values.priceControl,
        special_price:values.specialPriceControl,
        special_from_date:values.specialPriceFromControl,
        special_to_date:values.specialPriceToControl
      }).subscribe((res:any)=>{
        this.priceSavingIndicator=false;
        this.DSCskus[index]=res.updatedSku
        pricePopUp.close();
        console.log(res)
      },(error)=>{
        this.priceSavingIndicator=false;
        console.log(error)
      })
    }
  }

  updateQuantity(index,value,quantityPopUp){
    this.quantitySavingIndicator=true;
    this.darazskus.updateData('updatePriceQuantity',this.DSCskus[index]._id,{quantity:value}).
    subscribe((res:any)=>{
      this.quantitySavingIndicator=false;
      this.DSCskus[index]=res.updatedSku;
      quantityPopUp.close();
      console.log(res)
    },(error)=>{
      this.quantitySavingIndicator=false;
      console.log(error)
    })
  }

  togglePricePop(pP){
    if(this.openedPricePop){
      this.openedPricePop.close()
    }
    this.openedPricePop=pP;
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

  DeleteSku(row){
    console.log(row)

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
      return this.compare(a[sort.active],b[sort.active],isAsc)

    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

}
