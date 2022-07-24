import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { DashboardstatsService } from './../../services/dashboardstats.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { latLng, tileLayer } from 'leaflet';

import { ChartType } from './dashboard.model';

import { revenueChart } from './data';
import { Sort } from '@angular/material/sort';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-profit-analytics-content',
  templateUrl: './profit-analytics.component.html',
  styleUrls: ['./profit-analytics.component.scss']
})
export class ProfitAnalyticsComponent implements OnInit {


  //date
  startdate:Date
  enddate:Date
  //data
  ProfitStats={items:0,sales:0,costs:0,payout:0,profit:0,orders:0}
  StoreProfitStats=[]
  SortedStoreProfitStats=[]
  StoreSkuProfitStats=[]
  SortedStoreSkuProfitStats=[]
  TotalStoreSkuProfitStats={_id:null,items:0,costs:0,profit:0}
  SelectedSku:any
  SelectedStore:any
  OrderAnalytics:any
  StatusCount:any={rawData:{},status:[],orders:[],items:[],sales:[]}
  //graph
  ProfitAnalyticsGraph:any={Data:[],Labels:[]}
  StoreProfitAnalyticsGraph:any={Data:[],Labels:[]}
  SkuProfitAnalyticsGraph:any={Data:[],Labels:[]}
  //loadingindicator
  loadingIndicator=true
  overviewLoading=true
  overviewGraphLoading=true
  storesLoading=true
  storesGraphLoading=false
  skuLoading=false
  skuGraphLoading=false

  GraphOptions={
    Total:{Orders:true,Items:true,Revenue:true,Profit:true},
    Store:{Orders:true,Items:true,Revenue:true,Profit:true},
    Sku:{Orders:true,Items:true,Revenue:true,Profit:true}
  }

  constructor(public formBuilder: FormBuilder,private stats:DashboardstatsService,private spinner:NgxSpinnerService) {
  }

  // bread crumb items
  breadCrumbItems: Array<{}>;

  revenueChart: ChartType;






  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 6,
    center: latLng(46.879966, -121.726909)
  };

  ngOnInit(): void {
    this.enddate = moment().startOf('day').tz("Asia/Karachi").toDate();
    this.startdate = moment().endOf('day').tz("Asia/Karachi").toDate();

    this.breadCrumbItems = [{ label: 'Home' }, { label: 'Profitiblity', active: true }];
    this._fetchData();

    this.getProfitStats()
    this.getStoresProfitStats()
   
  }



  private _fetchData() {
    this.revenueChart = revenueChart;
  }

  fetchGraph(graph){
    if(graph=='total') this.getOverviewGraph()
    else if(graph=='store') this.getStoreGraph()
    else if(graph=='sku') this.getSkuGraph()
  }

  activateLoading(){
    this.loadingIndicator=true
    this.overviewLoading=true
    this.overviewGraphLoading=true
  }

  DateInput(mode,event){
    if(mode == 'start'){
      this.startdate = moment(event.value).startOf('day').tz("Asia/Karachi").toDate()
    }
    if(mode == 'end'){
      if(event.value != null){
        this.enddate = moment(event.value).endOf('day').tz("Asia/Karachi").toDate()
        // console.log(this.startdate);
        // console.log(this.enddate);
        this.getProfitStats()
        this.getStoresProfitStats()
        this.activateLoading()
    }
  }
}

getProfitStats(){
  this.stats.get('/getProfitAnalytics?startdate='+this.startdate.toISOString()+"&enddate="+this.enddate.toISOString()).subscribe((res:any)=>{
    if(Object.keys(res.ProfitStats).length!=0) this.ProfitStats=res.ProfitStats
    else{
      this.ProfitStats = {items:0,sales:0,costs:0,payout:0,profit:0,orders:0}
    }
    this.overviewLoading=false
  })

  this.stats.get('/OrderAnalytics/?startdate='+this.startdate.toISOString()+'&enddate='+this.enddate.toISOString()).subscribe(res=>{
    this.OrderAnalytics=res
    this.loadingIndicator=false
  })

  this.stats.get('/OrderStatuses/?startdate='+this.startdate.toISOString()+'&enddate='+this.enddate.toISOString()).subscribe((res:any)=>{
    if(res.length>0){
      this.StatusCount={rawData:{},status:[],orders:[],items:[],sales:[]}
      this.StatusCount.rawData=res;
      for(var data of this.StatusCount.rawData){
        if(data.status=='ready_to_ship') this.StatusCount.status.push('RTS'); else this.StatusCount.status.push(data.status.toUpperCase())
        this.StatusCount.orders.push(data.count.OrderCount)
        this.StatusCount.items.push(data.count.ItemCount)
        this.StatusCount.sales.push(data.count.sales)
      }
    }
    console.log(this.StatusCount)
  })

  this.getOverviewGraph()

}

getOverviewGraph(){
  this.overviewGraphLoading=true
  this.stats.get('/getProfitAnalyticsGraph?startdate='+this.startdate.toISOString()+'&enddate='+this.enddate.toISOString()
  +"&o="+this.GraphOptions.Total.Orders+"&i="+this.GraphOptions.Total.Items+"&r="+this.GraphOptions.Total.Revenue+"&p="+this.GraphOptions.Total.Profit).subscribe((res:any)=>{

    if(Object.keys(res).length>0) this.ProfitAnalyticsGraph=res
    this.overviewGraphLoading=false

  })
}


getStoresProfitStats(){
  this.storesLoading=true
  this.stats.get('/getStoresProfitStats?startdate='+this.startdate.toISOString()+"&enddate="+this.enddate.toISOString()).subscribe((res:any)=>{
    this.SortedStoreProfitStats=this.StoreProfitStats=res
    if(res.length>0) this.StoreClick(this.StoreProfitStats[0])
    this.storesLoading=false
  })
}

StoreClick(store){
  this.skuLoading=true
  this.TotalStoreSkuProfitStats=store
  this.stats.get('/getStoreSkuProfitStats?startdate='+this.startdate.toISOString()+"&enddate="+this.enddate.toISOString()+"&store="+this.TotalStoreSkuProfitStats._id).subscribe((res:any)=>{
    this.SortedStoreSkuProfitStats=this.StoreSkuProfitStats=res
    this.SkuClick(this.StoreSkuProfitStats[0]._id)
    this.skuLoading=false
  })

  this.getStoreGraph()

}

getStoreGraph(){
  this.storesGraphLoading=true
  this.stats.get('/getProfitAnalyticsGraph?startdate='+this.startdate.toISOString()+'&enddate='+this.enddate.toISOString()+"&store="+this.TotalStoreSkuProfitStats._id
  +"&o="+this.GraphOptions.Store.Orders+"&i="+this.GraphOptions.Store.Items+"&r="+this.GraphOptions.Store.Revenue+"&p="+this.GraphOptions.Store.Profit).subscribe((res:any)=>{
    if(Object.keys(res).length>0) this.StoreProfitAnalyticsGraph=res
    this.storesGraphLoading=false
  })
}

SkuClick(sku){
  this.SelectedSku=sku
  this.getSkuGraph()
}

getSkuGraph(){
  this.skuGraphLoading=true
  this.stats.get('/getProfitAnalyticsGraph?startdate='+this.startdate.toISOString()+'&enddate='+this.enddate.toISOString()+"&store="+this.TotalStoreSkuProfitStats._id+"&sku="+this.SelectedSku
  +"&o="+this.GraphOptions.Sku.Orders+"&i="+this.GraphOptions.Sku.Items+"&r="+this.GraphOptions.Sku.Revenue+"&p="+this.GraphOptions.Sku.Profit).subscribe((res:any)=>{
    if(Object.keys(res).length>0) this.SkuProfitAnalyticsGraph=res
    this.skuGraphLoading=false
  })
}


  getRoi(profit,cost){
    console.log("profit",profit)
    console.log("cost",cost)
    return (profit/cost)*100
  }

  sortStores(sort: Sort) {
    var data = this.StoreProfitStats.slice()
    if (!sort.active || sort.direction === '') {
      this.SortedStoreProfitStats = data;
      return;
    }
    this.SortedStoreProfitStats = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'store':
          return this.compare(a._id, b._id, isAsc);
        case 'orders':
          return this.compare(a.orders, b.orders, isAsc);
        case 'sales':
          return this.compare(a.sales, b.sales, isAsc);
        case 'payout':
          return this.compare(a.payout, b.payout, isAsc);  
        case 'costs':
          return this.compare(a.costs, b.costs, isAsc);
        case 'profit':
          return this.compare(a.profit, b.profit, isAsc);              
        default:
          return 0;
      }
    });
  }
  
  sortSkus(sort: Sort) {
    var data = this.StoreSkuProfitStats.slice()
    if (!sort.active || sort.direction === '') {
      this.SortedStoreSkuProfitStats = data;
      return;
    }
    this.SortedStoreSkuProfitStats = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'sku':
          return this.compare(a._id, b._id, isAsc);
        case 'items':
          return this.compare(a.items, b.items, isAsc);
        case 'sales':
          return this.compare(a.sales, b.sales, isAsc);
        case 'payout':
          return this.compare(a.payout, b.payout, isAsc);
        case 'costs':
          return this.compare(a.costs, b.costs, isAsc);
        case 'profit':
          return this.compare(a.profit, b.profit, isAsc);
        case 'roi':
          return this.compare(this.getRoi(a.profit,a.costs), this.getRoi(b.profit,b.costs), isAsc);
        default:
          return 0;
      }
    });
  }
  
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


}
