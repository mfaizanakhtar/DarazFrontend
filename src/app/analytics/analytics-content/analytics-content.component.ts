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

  constructor(public formBuilder: FormBuilder,private stats:DashboardstatsService) {
  }

  // bread crumb items
  breadCrumbItems: Array<{}>;

  revenueChart: ChartType;




  ngOnInit(): void {
    this.startdate.setHours(0,0,0,0);
    this.enddate.setHours(0,0,0,0);
    
    this.breadCrumbItems = [{ label: 'Home' }, { label: 'Dashboard', active: true }];

    this._fetchData();
    this.getStatusCount()
    this.getOrdersAnalytics();
    this.getStoreOrdersDetails()
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
        if(this.SelectedStore!=null) this.StoreClick(this.SelectedStore)
        if(this.SelectedStore!=null) this.getStoreOrderAnalyticsGraph()
        if(this.SelectedSku!=null) this.getSkuOrderAnalyticsGraph()
    }
  }
}

getStatusCount(){
  this.stats.get('/OrderStatuses/?startdate='+this.startdate.toISOString()+'&enddate='+this.enddate.toISOString()).subscribe((res:any)=>{
    if(res.length>0) this.StatusCount=res
    this.loadingIndicator=false
  })
}

getOrdersAnalytics(){
  this.stats.get('/OrderAnalytics/?startdate='+this.startdate.toISOString()+'&enddate='+this.enddate.toISOString()).subscribe(res=>{
    this.OrderAnalytics=res
    this.loadingIndicator=false
  })

  this.stats.get('/OrdersAnalyticsGraph?startdate='+this.startdate.toISOString()+'&enddate='+this.enddate.toISOString()).subscribe((res:any)=>{
    if(Object.keys(res).length>0) this.OrderAnalyticsGraph=res
  })
}

getStoreOrdersDetails(){
  this.stats.get('/getStoreOrdersDetail/?startdate='+this.startdate.toISOString()+'&enddate='+this.enddate.toISOString()).subscribe((res:any)=>{
    this.StoreDetails=res.StoreDetail

    if(this.StoreDetails.length>0){
      this.SelectedStore=this.StoreDetails[0].store
      this.StoreClick(this.SelectedStore)
    } 
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
  })

  this.getStoreOrderAnalyticsGraph()

}

SkuClick(sku){
  this.SelectedSku=sku
  this.getSkuOrderAnalyticsGraph()
}

getStoreOrderAnalyticsGraph(){
  this.stats.get('/OrdersAnalyticsGraph?startdate='+this.startdate.toISOString()+'&enddate='+this.enddate.toISOString()+"&store="+this.SelectedStore).subscribe((res:any)=>{
    if(Object.keys(res).length>0) this.StoreAnalyticsGraph=res
  })
}

getSkuOrderAnalyticsGraph(){
  this.stats.get('/OrdersAnalyticsGraph?startdate='+this.startdate.toISOString()+'&enddate='+this.enddate.toISOString()+"&store="+this.SelectedStore+"&sku="+this.SelectedSku).subscribe((res:any)=>{
    if(Object.keys(res).length>0) this.SkuAnalyticsGraph=res
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
