import { LabelService } from './../services/label.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderItemsService } from './../services/orderItems.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-orders-view',
  templateUrl: './orders-view.component.html',
  styleUrls: ['./orders-view.component.css']
})
export class OrdersViewComponent implements OnInit {
  //data
  // all=null
  orders:any;
  StoreArray=[]
  todayDate=new Date();
  backDate=new Date();
  //filters
  Fulfillment='Dropshipping';
  Store="All";
  StatusFilter;
  enddate:Date
  startdate:Date
  OrderId=null
  TrackingCode=null
  //datatable variables
  ColumnMode = ColumnMode;
  loadingIndicator = false;
  SelectionType = SelectionType;
  selected=[];
  status:any
  //for Indexing
  pSize=10
  pIndex=0
  length:number;
  //forStatusDefaultselection
  selectedVal
  //forSkuSorting
  skuSort=false
  //forShopSorting
  shopSort=false
  //forPrinted/not printed
  Printed=false
  UnPrinted=false

  //paginator
  pageEvent: PageEvent;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private orderService:OrdersService,private orderItemsService:OrderItemsService,private toastr:ToastrService,private router:Router,private lableService:LabelService) { }

  ngOnInit(): void {
    this.StatusFilter='pending'
    this.backDate.setDate(this.backDate.getDate()-15)
    this.todayDate.setHours(0,0,0,0);
    this.backDate.setHours(0,0,0,0);
    this.enddate=this.todayDate
    this.startdate=this.backDate 
    this.getOrders()
  }

  getOrders(){ 
    var tempstatus,tempstore,tempfulfillment
    if(this.StatusFilter=='All') {tempstatus=null } else tempstatus=this.StatusFilter
    if(this.Store=='All') { tempstore=null } else tempstore=this.Store
    if(this.Fulfillment=='All') { tempfulfillment=null } else tempfulfillment=this.Fulfillment
    this.selected=[]

    this.loadingIndicator = true;
    this.orderService.get('/orders?'+'OrderItems.Status='+tempstatus+'&skuSort='+this.skuSort+'&shopSort='+this.shopSort+'&Printed='+this.Printed+'&unPrinted='+this.UnPrinted+'&pageSize='+this.pSize+"&pageNumber="+this.pIndex
    +"&OrderId="+this.OrderId+"&OrderItems.TrackingCode="+this.TrackingCode+"&ShopId="+tempstore+"&OrderItems.ShippingType="+tempfulfillment+"&startDate="+this.startdate.toISOString()+"&endDate="+this.enddate.toISOString()).subscribe(res=>{
      console.log(res)

      this.orders=res[0]
      this.length=res[1]
      this.StoreArray=res[2]
      this.loadingIndicator = false;


    })
  }

  getOrderStatus(orderitems){
    var result = orderitems.every( (val, i, arr) => val.Status === arr[0].Status )
    if(result==true){
      return orderitems[0].Status
    }
    else{
      if(this.StatusFilter=='pending' || this.StatusFilter=='ready_to_ship'){
        return this.StatusFilter
      }
      else if(this.StatusFilter=='RTSDispatched'){
        return 'ready_to_ship'
      } 
      return "Multiple Statuses"
    } 
  }

  printCheckbox(){
    // console.log(this.Printed+" "+this.UnPrinted)
    this.getOrders()
  }

  adjustedDate(date){
    var result = new Date(date)
    result.setHours(result.getHours()-5)
    return result
  }

  orderSort(event){
    this.skuSort=event.checked
    console.log(this.skuSort)
    this.getOrders()
  }

  shopSorting(event){
    this.shopSort=event.checked
    console.log(this.shopSort)
    this.getOrders()
  }

  getPrice(orderitems){
    // console.log(orderitems)
    var result=0
    for (let items of orderitems){
      if(items.ShippingType==this.Fulfillment || this.Fulfillment=="All"){
      result = result + items.ItemPrice + items.ShippingAmount
      }
    }
    return result
  }

  getItemsCount(orderitems){
    var result=0
    for (let items of orderitems){
      if(items.ShippingType==this.Fulfillment || this.Fulfillment=="All"){
      result=result+1
      }
    }
    return result
  }

  UpdateStatus(Status){
    // console.log(Status)
    // console.log(this.selected)
    var selectedArray=[]
    this.selected.map(s=>{
      selectedArray.push(s.OrderId)
    })

    this.orderItemsService.updateData("Update",Status,{orders:selectedArray,date:new Date()}).subscribe(res=>{
      var response:any=res
      if(response.nModified>0){
        this.selected=[]
        this.getOrders()
      } 
    })

  }

  printLabels(){
    if(this.Fulfillment!="Dropshipping"){
      this.toastr.warning("Please Select Fulfillment Type to FBM")
    }
    else if(this.StatusFilter=="pending"){
      this.toastr.warning("Can not print orders in pending state")
    }
    else{
      this.loadingIndicator=true
      // this.lableService.setOrders(this.selected)
      // this.router.navigate(["printLabels"])
      var ordersData=[]
      for(var order of this.selected){
        ordersData.push(order.OrderId)
      }

      this.orderService.postDataByCap('/getLabelsData',{Orders:ordersData,skuSort:this.skuSort,shopSort:this.shopSort}).subscribe(res=>{
        console.log(res)
        var response:any = res;
        if(response.length>0){
        this.lableService.setOrders(response)
        this.loadingIndicator=false
        this.router.navigate(["printLabels"])
      }
      else{
        this.loadingIndicator=false
        this.toastr.error("Error printing labels. Please Try again")
      }
      })
    }
  }

  StatusFilterClicked(status){
    this.pSize=10
    this.pIndex=0
    this.StatusFilter=status
    console.log(this.StatusFilter)
    this.getOrders()
  }

  setStatusToRTS(){
    this.loadingIndicator=true
    this.orderService.postDataByCap('/setStatusToRTS',{Orders:this.selected}).subscribe(res=>{
      var response:any = res
      console.log(response.count)
      if(response.count>0){
        this.toastr.success("RTS Request Successful")
        this.getOrders()
        this.loadingIndicator=false
      }
      else{
        this.toastr.error("Error Submitting RTS request")
      }
    })
  }
  setItemStatusToRTS(item){
    this.loadingIndicator=true
    this.orderService.postDataByCap('/setItemStatusToRTS',{OrderItem:item}).subscribe(res=>{
      var response:any = res
      console.log(response.count)
      if(response.count>0){
        this.toastr.success("RTS Request Successful")
        this.getOrders()
        this.loadingIndicator=false
      }
      else{
        this.toastr.error("Error Submitting RTS request")
      }
    })
  }

  DateInput(mode,event){
    if(mode == 'start'){
      this.startdate = event.value
    }
    if(mode == 'end'){
      if(event.value != null){
        this.enddate = event.value
        this.pSize=10
        this.pIndex=0
        this.getOrders()
      }
    }
    

  }

  changePageData(event?:PageEvent){
    this.pSize=event.pageSize;
    this.pIndex=event.pageIndex
    this.getOrders()
  }

  findOrder(f){
    // console.log(f.value)
    this.OrderId=f.value.OrderId
    this.TrackingCode=f.value.Tracking

    if(this.OrderId=="") this.OrderId=null
    if(this.TrackingCode=="") this.TrackingCode=null

    this.getOrders()
  }

  FulfillmentSelected(event){
    this.pSize=10
    this.pIndex=0
    this.Fulfillment = event.value

    this.getOrders()
  }
  StoreSelected(event){
    this.pSize=10
    this.pIndex=0
    if(event.value=="All") this.Store=null
    else this.Store = event.value

    this.getOrders()
  }
//NGX-DATATABLE
  onSelect({ selected }) {

    this.selected.splice(0, this.selected.length);
    for(const sel of selected){
      this.selected.push(sel);
    }
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }


}
