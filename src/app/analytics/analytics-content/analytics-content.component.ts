import { AuthService } from 'src/app/services/auth.service';
import { DashboardstatsService } from './../../services/dashboardstats.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { latLng, tileLayer } from 'leaflet';

import { ChartType, Stat, Chat, Transaction } from './dashboard.model';

import { statData, revenueChart, salesAnalytics, sparklineEarning, sparklineMonthly, chatData, transactions } from './data';

@Component({
  selector: 'app-analytics-content',
  templateUrl: './analytics-content.component.html',
  styleUrls: ['./analytics-content.component.scss']
})
export class AnalyticsContentComponent implements OnInit {

  currentUser:any
  term: any;
  transactions: Transaction[];
  statData: Stat[];
  //date
  startdate=new Date()
  enddate=new Date()
  //Data
  StatusCount:any=[{count:{OrderCount:0,ItemCount:0}},{count:{OrderCount:0,ItemCount:0}},{count:{OrderCount:0,ItemCount:0}},{count:{OrderCount:0,ItemCount:0}}]
  OrderAnalytics:any=[]
  StoreDetails:any=[]
  StoreSkuDetails:any=[]
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

  constructor(public formBuilder: FormBuilder,private stats:DashboardstatsService,private auth:AuthService) {
  }

  // bread crumb items
  breadCrumbItems: Array<{}>;

  revenueChart: ChartType;




  ngOnInit(): void {

    this.adjustUserSettings()
    this.startdate.setHours(0,0,0,0);
    this.enddate.setHours(0,0,0,0);
    
    this.breadCrumbItems = [{ label: 'Home' }, { label: 'Dashboard', active: true }];

    this._fetchData();
    this.getStatusCount()
    this.getOrdersAnalytics();
    this.getStoreOrdersDetails()
  }

  adjustUserSettings() {
    this.currentUser=this.auth.getCurrentUser()
    if(!this.currentUser.Profitibility){
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
      this.startdate = event.value
    }
    if(mode == 'end'){
      if(event.value != null){
        this.enddate = event.value
        // console.log(this.startdate);
        // console.log(this.enddate);
        this.getStatusCount()
        this.getOrdersAnalytics()
        this.getStoreOrdersDetails()
        this.activateLoading()
        if(this.SelectedStore!=null) this.StoreClick(this.SelectedStore)
        if(this.SelectedStore!=null) this.getStoreOrderAnalyticsGraph()
        if(this.SelectedSku!=null) this.getSkuOrderAnalyticsGraph()
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
    this.StoreDetails=res.StoreDetail

    if(this.StoreDetails.length>0){
      this.SelectedStore=this.StoreDetails[0].store
      this.StoreClick(this.SelectedStore)
    } 
    this.storesLoading=false
  })

}

StoreClick(store){
  console.log(store)
  this.SelectedStore=store
  this.stats.get('/getStoreSkuDetails/?'+"store="+this.SelectedStore+"&startdate="+this.startdate.toISOString()+'&enddate='+this.enddate.toISOString()).subscribe((res:any)=>{
    this.StoreSkuDetails=res.SkuDetail
    console.log(this.StoreSkuDetails)
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
  this.stats.get('/OrdersAnalyticsGraph?startdate='+this.startdate.toISOString()+'&enddate='+this.enddate.toISOString()+"&store="+this.SelectedStore
  +"&o="+this.GraphOptions.Store.Orders+"&i="+this.GraphOptions.Store.Items+"&r="+this.GraphOptions.Store.Revenue).subscribe((res:any)=>{
    if(Object.keys(res).length>0) this.StoreAnalyticsGraph=res
    this.storesGraphLoading=false
  })
}

getSkuOrderAnalyticsGraph(){
  this.skuGraphLoading=true
  this.stats.get('/OrdersAnalyticsGraph?startdate='+this.startdate.toISOString()+'&enddate='+this.enddate.toISOString()+"&store="+this.SelectedStore+"&sku="+this.SelectedSku
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


}
