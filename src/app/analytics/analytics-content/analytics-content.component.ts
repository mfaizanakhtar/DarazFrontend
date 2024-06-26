import { AuthService } from 'src/app/services/auth.service';
import { DashboardstatsService } from './../../services/dashboardstats.service';
import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { latLng, tileLayer } from 'leaflet';

import { ChartType, Stat, Chat, Transaction } from './dashboard.model';

import { statData, revenueChart, salesAnalytics, sparklineEarning, sparklineMonthly, chatData, transactions } from './data';
import { Sort } from '@angular/material/sort';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-analytics-content',
  templateUrl: './analytics-content.component.html',
  styleUrls: ['./analytics-content.component.scss']
})
export class AnalyticsContentComponent implements OnInit {

  permissions:any
  term: any;
  transactions: Transaction[];
  statData: Stat[];
  //date
  startdate:Date
  enddate:Date
  //Data
  StatusCount:any=[{count:{OrderCount:0,ItemCount:0}},{count:{OrderCount:0,ItemCount:0}},{count:{OrderCount:0,ItemCount:0}},{count:{OrderCount:0,ItemCount:0}}]
  OrderAnalytics:any=[]
  StoreDetails:any=[]
  SortedStoreDetails:any=[]
  StoreSkuDetails:any=[]
  SortedStoreSkuDetails:any=[]
  SkuTotal={OwnWarehouse:0,Dropshipping:0}
  TotalOrders
  SelectedStore=null
  SelectedSku=null
  //graph
  OrderAnalyticsGraph={Data:[],Labels:[]}
  StoreAnalyticsGraph={Data:[],Labels:[]}
  SkuAnalyticsGraph={Data:[],Labels:[]}
  //indicator
  loadingIndicator=true;
  overviewStatusLoading=true
  overviewAnalyticsLoading=true
  overviewGraphLoading=true
  storesLoading=true
  storesGraphLoading=false
  skuLoading=false
  skuGraphLoading=false

  GraphOptions={
    Total:{Orders:true,Items:true,Revenue:true},
    Store:{Orders:true,Items:true,Revenue:true},
    Sku:{Orders:true,Items:true,Revenue:true}
  }
  //analyticsTable
  skuHeaderCheck:boolean=false;
  @ViewChild('storeScroll') storeScroll?: PerfectScrollbarComponent;
  @ViewChild('skuScroll') skuScroll?: PerfectScrollbarComponent;
  constructor(public formBuilder: FormBuilder,private stats:DashboardstatsService,private auth:AuthService,private cdRef:ChangeDetectorRef) {
  }

  // bread crumb items
  breadCrumbItems: Array<{}>;

  revenueChart: ChartType;




  ngOnInit(): void {

    this.adjustUserSettings()
    this.enddate = moment().tz("Asia/Karachi").endOf('day').toDate();
    this.startdate = moment().tz("Asia/Karachi").startOf('day').toDate();
    
    this.breadCrumbItems = [{ label: 'Home' }, { label: 'Dashboard', active: true }];

    this._fetchData();
    this.getStatusCount()
    this.getOrdersAnalytics();
    this.getStoreOrdersDetails()
    
  }

  ngAfterViewInit():void{
  }

  adjustUserSettings() {
    this.permissions=this.auth.getPermissions()
    if(this.permissions.hasOwnProperty("Profitibility") && this.permissions.Profitibility.value){
      this.GraphOptions.Total.Revenue=false
      this.GraphOptions.Store.Revenue=false
      this.GraphOptions.Sku.Revenue=false

    }
  }
  

  fetchGraph(graph){
    if(graph=='total') this.getOverviewGraph()
    else if(graph=='store') this.getStoreOrderAnalyticsGraph()
    else if(graph=='sku') this.getSkuOrderAnalyticsGraph()
  }

  activateLoading(){
    this.loadingIndicator=true;
    this.overviewStatusLoading=true
    this.overviewAnalyticsLoading=true
    this.overviewGraphLoading=true
    this.storesLoading=true
  }

  DateInput(mode,event){
    if(mode == 'start'){
      this.startdate = moment(event.value).tz("Asia/Karachi").startOf('day').toDate()
      
    }
    if(mode == 'end'){
      if(event.value != null){
        this.enddate = moment(event.value).tz("Asia/Karachi").endOf('day').toDate()
        // console.log(this.startdate);
        // console.log(this.enddate);
        this.getStatusCount()
        this.getOrdersAnalytics()
        this.getStoreOrdersDetails()
        
        this.activateLoading()

    }
  }
}

getStatusCount(){
  this.stats.get('/OrderStatuses/?startdate='+this.startdate.toISOString()+'&enddate='+this.enddate.toISOString()).subscribe((res:any)=>{
    if(res.length>0) this.StatusCount=res
    this.overviewStatusLoading=false
  })
}

getOrdersAnalytics(){
  this.stats.get('/OrderAnalytics/?startdate='+this.startdate.toISOString()+'&enddate='+this.enddate.toISOString()).subscribe(res=>{
    this.OrderAnalytics=res
    this.overviewAnalyticsLoading=false
  })

  this.getOverviewGraph()

}

getOverviewGraph(){


  this.overviewGraphLoading=true
  this.stats.get('/OrdersAnalyticsGraph?startdate='+this.startdate.toISOString()+'&enddate='+this.enddate.toISOString()
  +"&o="+this.GraphOptions.Total.Orders+"&i="+this.GraphOptions.Total.Items+"&r="+this.GraphOptions.Total.Revenue).subscribe((res:any)=>{
    if(Object.keys(res).length>0) this.OrderAnalyticsGraph=res
    this.overviewGraphLoading=false
  })
}

getStoreOrdersDetails(){
  this.stats.get('/getStoreOrdersDetail/?startdate='+this.startdate.toISOString()+'&enddate='+this.enddate.toISOString()).subscribe((res:any)=>{
    this.SortedStoreDetails=this.StoreDetails=res.StoreDetail

    if(this.StoreDetails.length>0){
      this.SelectedStore=this.StoreDetails[0].shopShortCode
      this.StoreClick(this.SelectedStore)
    } 
    this.storesLoading=false
  })

}

StoreClick(storeShortCode){
  this.SelectedStore=storeShortCode
  this.stats.get('/getStoreSkuDetails/?'+"shortCode="+this.SelectedStore+"&startdate="+this.startdate.toISOString()+'&enddate='+this.enddate.toISOString()).subscribe((res:any)=>{
    this.SortedStoreSkuDetails=this.StoreSkuDetails=res.SkuDetail
    this.SkuTotal=res.SkuTotal

    if(this.StoreSkuDetails.length>0){
      this.SkuClick(this.StoreSkuDetails[0].sku)
    }
    this.skuLoading=false
  })

  this.getStoreOrderAnalyticsGraph()

}

SkuClick(sku){
  this.SelectedSku=sku
  this.getSkuOrderAnalyticsGraph()
}

getStoreOrderAnalyticsGraph(){
  this.storesGraphLoading=true
  this.stats.get('/OrdersAnalyticsGraph?startdate='+this.startdate.toISOString()+'&enddate='+this.enddate.toISOString()+"&shopShortCode="+this.SelectedStore
  +"&o="+this.GraphOptions.Store.Orders+"&i="+this.GraphOptions.Store.Items+"&r="+this.GraphOptions.Store.Revenue).subscribe((res:any)=>{
    if(Object.keys(res).length>0) this.StoreAnalyticsGraph=res
    this.storesGraphLoading=false
  })
}

getSkuOrderAnalyticsGraph(){
  this.skuGraphLoading=true
  this.stats.get('/OrdersAnalyticsGraph?startdate='+this.startdate.toISOString()+'&enddate='+this.enddate.toISOString()+"&shopShortCode="+this.SelectedStore+"&sku="+encodeURIComponent(this.SelectedSku)
  +"&o="+this.GraphOptions.Sku.Orders+"&i="+this.GraphOptions.Sku.Items+"&r="+this.GraphOptions.Sku.Revenue).subscribe((res:any)=>{
    if(Object.keys(res).length>0) this.SkuAnalyticsGraph=res
    this.skuGraphLoading=false
  })
}

objEmpty(object){
  if(Object.keys(object).length>0) return false
  return true
}

private _fetchData() {
  this.revenueChart = revenueChart;
  this.transactions = transactions;
}

checkScroll($event){
  // this.storeScroll.directiveRef.scrollToBottom();
  // console.log(this.skuHeaderCheck)
  // if(this.skuScroll.directiveRef.position(true).y>=126){
  //   this.skuHeaderCheck=true
  //   this.cdRef.detectChanges();
  // } 
  // else{
  //   this.skuHeaderCheck=false
  //   this.cdRef.detectChanges();
  // } 
  // this.storeScroll.directiveRef.scrollToBottom();
  // console.log($event);
  // var el = document.getElementById("#first-table")
  // el.addEventListener("ps-y-reach-end",(event)=>{
  //   console.log("At the end")
  // })
}

sortStores(sort: Sort) {
  var data = this.StoreDetails.slice()
  if (!sort.active || sort.direction === '') {
    this.SortedStoreDetails = data;
    return;
  }
  this.SortedStoreDetails = data.sort((a, b) => {
    const isAsc = sort.direction === 'asc';
    return this.compare(a[sort.active],b[sort.active],isAsc)

  });
}

sortSkus(sort: Sort) {
  var data = this.StoreSkuDetails.slice()
  if (!sort.active || sort.direction === '') {
    this.SortedStoreSkuDetails = data;
    return;
  }
  this.SortedStoreSkuDetails = data.sort((a, b) => {
    const isAsc = sort.direction === 'asc';
    return this.compare(a[sort.active],b[sort.active],isAsc)

  });
}

compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}




}

