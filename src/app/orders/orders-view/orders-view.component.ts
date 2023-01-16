import { CustomOrderStatusService } from './../../services/custom-order-status.service';
import { CustomOrderStatusComponent } from '../custom-order-statuses/custom-order-status/custom-order-status.component';
import { LabelService } from '../../services/label.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderItemsService } from '../../services/orderItems.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { OrdersService } from '../../services/orders.service';
import { MatDialog } from '@angular/material/dialog';
import { PrintLabelsComponent } from '../print-labels/print-labels.component';
import { StockChecklistComponent } from '../../product/stock-checklist/stock-checklist.component';
import { AuthService } from '../../services/auth.service';
import { PerfectScrollbarConfig, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-orders-view',
  templateUrl: './orders-view.component.html',
  styleUrls: ['./orders-view.component.scss']
})
export class OrdersViewComponent implements OnInit {
  permissions
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
  FormattedStatus;
  isCustomStatus:Boolean=false;
  isEditCustomStatus:Boolean=false
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
  prevExapandedRow:any=null
  customStatuses:any[]=[]
  markableCustomStatuses:any[]=[]
  customToggleAppearence="legacy"
  dateFilterDisabled=false;
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
  //perfectscrollbar
  public config: PerfectScrollbarConfigInterface = {};
  breadCrumbItems: Array<{}>;

  //paginator
  pageEvent: PageEvent;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private orderService:OrdersService,private orderItemsService:OrderItemsService,
    private toastr:ToastrService,private router:Router,private lableService:LabelService,private dialog:MatDialog,
    private auth:AuthService,private customStatusService:CustomOrderStatusService) { }

  ngOnInit(): void {
    this.permissions=this.auth.getPermissions()
    this.StatusFilter='pending'
    this.FormattedStatus='Pending'
    this.enddate = moment().tz("Asia/Karachi").endOf('day').toDate();
    this.startdate = moment().tz("Asia/Karachi").subtract(15, "days").startOf('day').toDate();

    this.getOrders()
    this.getAllCustomStatuses();

    this.breadCrumbItems = [{ label: 'Home' }, { label: 'Orders', active: true }];
  }

  getOrders(){
    this.orders=[]
    var tempstatus,tempstore,tempfulfillment
    if(this.StatusFilter=='All') {tempstatus=null } else tempstatus=this.StatusFilter
    if(this.Store=='All') { tempstore=null } else tempstore=this.Store
    if(this.Fulfillment=='All') { tempfulfillment=null } else tempfulfillment=this.Fulfillment
    if(this.dateFilterDisabled){
      this.startdate=null;
      this.enddate=null;
    }
    this.selected=[]

    this.loadingIndicator = true;
    this.orderService.get('/orders?'+'OrderItems.Status='+tempstatus+'&skuSort='+this.skuSort+'&shopSort='+this.shopSort+'&Printed='+this.Printed+'&unPrinted='+this.UnPrinted+'&pageSize='+this.pSize+"&pageNumber="+this.pIndex
    +"&OrderId="+this.OrderId+"&OrderItems.TrackingCode="+this.TrackingCode+"&ShopShortCode="+tempstore+"&OrderItems.ShippingType="+tempfulfillment+"&startDate="+this.startdate?.toISOString()+"&endDate="+this.enddate?.toISOString()
    +"&isCustomStatus="+this.isCustomStatus).subscribe((res:any)=>{
      console.log(res)

      this.orders=res.orders
      this.length=res.count
      this.StoreArray=res.stores
      this.loadingIndicator = false;


    })
  }

  getAllCustomStatuses(){
    this.customStatusService.get('/getAllCustomStatuses').subscribe((resp:any)=>{
      this.customStatuses=resp
      this.markableCustomStatuses=this.customStatuses.filter(status=>status.isMarkable).map(status=>{return status.statusName})
      debugger
    },(error)=>{
      console.log(error)
    })
  }


  getProfit(payout,cost,packagingCost){

    var profit=0
    if(payout!=0){
      profit = payout - cost - packagingCost
      return profit.toFixed(1)
    }
    return "-"
  }

  getOrderStatus(orderitems){
    var result = orderitems.every( (val, i, arr) => val.Status === arr[0].Status )
    if(result==true){
      return orderitems[0].Status
    }
    else{
      return "Multiple Statuses"
    } 
  }

  printCheckbox(){
    // console.log(this.Printed+" "+this.UnPrinted)
    this.getOrders()
  }

  orderSort(event){
    this.skuSort=event.checked
    if(this.skuSort==true) this.shopSort=false
    console.log(this.skuSort)
    this.getOrders()
  }

  shopSorting(event){
    this.shopSort=event.checked
    if(this.shopSort==true) this.skuSort=false
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
    selectedArray = this.selected.map(s=>{
      return s.OrderId
    })

    this.orderItemsService.updateData("updateStatus",Status,{orders:selectedArray,date:new Date()}).subscribe(res=>{
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
        if(response.labelsData.length>0){
        this.lableService.setOrders(response)
        this.loadingIndicator=false
        // this.router.navigate(["printLabels"])
        this.dialog.open(PrintLabelsComponent,{width:'100%',height:'100%'})
      }
      else{
        this.loadingIndicator=false
        this.toastr.error("Error printing labels. Please Try again")
      }
      })
    }
  }

  printStockChecklist(Status){
    this.loadingIndicator=true
    var ordersData=[]
    for(var order of this.selected){
      ordersData.push(order.OrderId)
    }
    var skuType;
    (this.permissions.hasOwnProperty("baseSkuStockChecklist") && this.permissions.baseSkuStockChecklist.value==true) ? skuType="BaseSku" : skuType="Sku"
    if(Status=="selected"){
      this.orderService.postDataByCap('/getStockChecklist/'+skuType,{orders:ordersData}).subscribe(res=>{
        // console.log(res)
        this.lableService.setStockChecklist(res)
        this.loadingIndicator=false
        this.dialog.open(StockChecklistComponent,{width:'100%',height:'100%'})
      })
    }
    else{
      var tempstatus,tempstore,tempfulfillment
      if(this.StatusFilter=='All') {tempstatus=null } else tempstatus=this.StatusFilter
      if(this.Store=='All') { tempstore=null } else tempstore=this.Store
      if(this.Fulfillment=='All') { tempfulfillment=null } else tempfulfillment=this.Fulfillment

      this.orderService.get('/getFilterStockChecklist?'+'Status='+tempstatus+'&Printed='+this.Printed+'&unPrinted='+this.UnPrinted+
      "&OrderId="+this.OrderId+"&TrackingCode="+this.TrackingCode+"&ShopId="+tempstore+"&ShippingType="+tempfulfillment+
      "&startDate="+this.startdate?.toISOString()+"&endDate="+this.enddate?.toISOString()).subscribe(res=>{
        // console.log(res);

        this.lableService.setStockChecklist(res)
        this.loadingIndicator=false
        this.dialog.open(StockChecklistComponent,{width:'100%',height:'100%'})
      })
    }

  }

  StatusFilterClicked(status,formattedFilter,isCustomStatus?:any){
    debugger
    this.pSize=10
    this.pIndex=0
    this.StatusFilter=status
    this.isCustomStatus = isCustomStatus!=null ? isCustomStatus : false
    if(!isCustomStatus){
      this.dateFilterDisabled=false
    }
    if(!this.dateFilterDisabled){
      this.resetDateRange()
    }
    this.FormattedStatus=formattedFilter

    this.startdate = moment().tz("Asia/Karachi").subtract(15, "days").startOf('day').toDate();
    this.getOrders()
  } 

  setStatusToRTS(){
    this.loadingIndicator=true
    this.orderService.postDataByCap('/setStatusToRTS',{Orders:this.selected}).subscribe(res=>{
      var response:any = res
      console.log(response)
      if(response.count>0 && response.updateResult==true){
        // setTimeout(()=>{
          this.toastr.success("RTS Request Successful")
          this.getOrders()
          this.loadingIndicator=false
        // },5000)
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
        
        setTimeout(()=>{
          this.toastr.success("RTS Request Successful")
          this.getOrders()
          this.loadingIndicator=false
        },3000)

      }
      else{
        this.toastr.error("Error Submitting RTS request")
      }
    })
  }

  DateInput(mode,event){
    debugger
    if(mode == 'start'){
      this.startdate = moment(event.value).tz("Asia/Karachi").startOf('day').toDate()
    }
    if(mode == 'end'){
      if(event.value != null){
        this.enddate = moment(event.value).tz("Asia/Karachi").endOf('day').toDate()
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

  EditClaim(id){
    console.log(id)
    document.getElementById("input"+id).hidden=false
    document.getElementById("text"+id).hidden=true
    document.getElementById("edit"+id).hidden=true
    document.getElementById("save"+id).hidden=false
  }
  
  SaveClaim(id,row){
    console.log(row._id)
    this.orderService.updateData("updateClaim",row._id,{ClaimNumber:row.ClaimNumber}).subscribe(res=>{
      document.getElementById("input"+id).hidden=true
      document.getElementById("text"+id).hidden=false
      document.getElementById("edit"+id).hidden=false
      document.getElementById("save"+id).hidden=true
    })

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
    if(this.prevExapandedRow!=null && this.prevExapandedRow!=row){
      this.table.rowDetail.collapseAllRows()
    }
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
    this.prevExapandedRow=row;
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

  onScrollEvent(event){
    console.log(event)
  }

  customStatusFilterClicked(customStatus){
    debugger
    this.dateFilterDisabled=false
    if(this.isEditCustomStatus && customStatus?.statusArray?.length>0){
      this.openCustomStatusDialog(customStatus)
    }else{
      if(customStatus.hasDateRange){
        this.dateFilterDisabled=true
      }else{
        this.dateFilterDisabled=false
      }
      this.StatusFilterClicked(customStatus._id,customStatus.statusName,true)
    }
  }

  openCustomStatusDialog(editValues?:any){
    let dialogConfig={}
    dialogConfig={width:'50%',height:'50%'};
    if(editValues) dialogConfig={...dialogConfig,data:editValues};
    this.dialog.open(CustomOrderStatusComponent,dialogConfig).afterClosed().subscribe(closeResp=>{
      debugger
      if(closeResp && closeResp.isCreated && !closeResp.isEdit){ 
        this.customStatuses.push(closeResp.createdCustomStatus)
        if(closeResp.createdCustomStatus.isMarkable) this.markableCustomStatuses.push(closeResp.createdCustomStatus.statusName)
      }
      else if(closeResp && closeResp.isCreated && closeResp.isEdit){
        this.markableCustomStatuses = this.markableCustomStatuses.filter(status=>status!=closeResp.createdCustomStatus.statusName)
        if(closeResp.createdCustomStatus.isMarkable) this.markableCustomStatuses.push(closeResp.createdCustomStatus.statusName)
      }
      else if(closeResp && closeResp.isDeleted){
        this.customStatuses = this.customStatuses.filter(status=>status.statusName!=editValues.statusName)
        if(editValues.isMarkable) this.markableCustomStatuses = this.markableCustomStatuses.filter(markableStatus=>markableStatus!=editValues.statusName)
      }
    })
  }

  resetDateRange(){
    this.enddate = moment().tz("Asia/Karachi").endOf('day').toDate();
    this.startdate = moment().tz("Asia/Karachi").subtract(15, "days").startOf('day').toDate();
  }


}
