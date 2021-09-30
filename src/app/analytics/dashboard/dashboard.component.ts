import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jsSHA from 'jssha'
import { OrderItemsService } from '../../services/orderItems.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss',
  "../../../assets/table/vendor/bootstrap/css/bootstrap.min.css",
  "../../../assets/table/fonts/font-awesome-4.7.0/css/font-awesome.min.css",
  "../../../assets/table/vendor/animate/animate.css",
  "../../../assets/table/vendor/select2/select2.min.css",
  "../../../assets/table/vendor/perfect-scrollbar/perfect-scrollbar.css",
  "../../../assets/table/css/util.css",
  "../../../assets/table/css/main.css"]
})
export class DashboardComponent implements OnInit {

  orders:any
  startdate=new Date();
  enddate=new Date();
  ShippingCount;
  StoreArray=[];
  SkuStoreStats;
  AllStats;
  Date;
  ShopId;
  StoreBreakdown=[];
  SkuArray=[];
  // sdate=new Date();
  // edate=new Date();
  constructor(private order:OrderItemsService) { }

  ngOnInit(): void {
    this.startdate.setHours(0,0,0,0);
    this.enddate.setHours(0,0,0,0);
    
    console.log(this.startdate.toISOString());
    console.log(this.enddate.toISOString());
    this.AllStoreStats(this.startdate,this.enddate);
  }
  DateInput(mode,event){
    if(mode == 'start'){
      this.startdate = event.value
    }
    if(mode == 'end'){
      if(event.value != null){
        this.enddate = event.value
        console.log(this.startdate);
        console.log(this.enddate);
        this.AllStoreStats(this.startdate,this.enddate);
        this.SkuDetails(this.ShopId,this.startdate,this.enddate)
      }
    }
  }


  StoreSelected(event){
    this.ShopId = event.value;
    this.SkuDetails(this.ShopId,this.startdate,this.enddate);
    
  }

  SkuDetails(id,startdate,enddate){
    this.order.get('Skustats?'+"ShopId="+id+"&startdate="+startdate.toISOString()+"&enddate="+enddate.toISOString()).subscribe(response=>{
      // console.log(response);
      this.SkuStoreStats = response;
      this.SkuStoreStats.sort((a,b)=>{
        if(a._id<b._id){
          return -1
        }
        if(a._id>b._id){
          return 1
        }
        return 0
      })
    })
  }

  AllStoreStats(startdate,enddate){
    // console.log(startdate)
    this.order.get('allstats?'+"startdate="+startdate.toISOString()+"&enddate="+enddate.toISOString()).subscribe(response=>{
      console.log(response);
      this.AllStats = response;
      this.AllStats.sort((a,b)=>{
        if(a._id<b._id){
          return -1
        }
        if(a._id>b._id){
          return 1
        }
        return 0
      })



      this.AllStats.forEach(o => {
        if(o._id!='ALL STORES'){
        if(!this.StoreArray.includes(o._id))
        this.StoreArray.push(o._id);
        }
      });
      
    
    
    })
    
  }
}
