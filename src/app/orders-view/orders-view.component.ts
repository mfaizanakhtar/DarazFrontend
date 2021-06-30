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
  orders:any;
  StoreArray=[]
  todayDate=new Date();
  backDate=new Date();
  //filters
  Fulfillment='Dropshipping';
  Store="All";
  StatusFilter=null;
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

  //paginator
  pageEvent: PageEvent;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private orderService:OrdersService) { }

  ngOnInit(): void {
    this.selectedVal='All'
    this.backDate.setDate(this.backDate.getDate()-15)
    this.enddate=this.todayDate
    this.startdate=this.backDate 
    this.getOrders()
  }

  getOrders(){  
    if(this.StatusFilter=='All') this.StatusFilter=null
    if(this.Store=='All') this.Store=null
    if(this.Fulfillment=='All') this.Fulfillment=null

    this.loadingIndicator = true;
    this.orderService.get('/?'+'OrderItems.Status='+this.StatusFilter+'&pageSize='+this.pSize+"&pageNumber="+this.pIndex
    +"&OrderId="+this.OrderId+"&OrderItems.TrackingCode="+this.TrackingCode+"&ShopId="+this.Store+"&OrderItems.ShippingType="+this.Fulfillment+"&startDate="+this.startdate.toISOString()+"&endDate="+this.enddate.toISOString()).subscribe(res=>{
      console.log(res)
      this.orders=res[0]
      this.length=res[1]
      this.StoreArray=res[2]
      this.loadingIndicator = false;
    })
  }

  StatusFilterClicked(status){
    this.pSize=10
    this.pIndex=0
    this.StatusFilter=status
    this.getOrders()
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

  formatDate(date){
    var d = new Date(date);
    var month = d.getMonth()+1
    var formattedDate=d.toLocaleDateString('en-US',{weekday:'long'})+' '+ d.getDate()+'-'+month+'-'+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes()
    return formattedDate
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
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    for(const sel of selected){
      this.selected.push(sel);
    }
    console.log(this.selected);
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
