import { DzapiService } from './../dzapi.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jsSHA from 'jssha'
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css',
  "../../assets/table/vendor/bootstrap/css/bootstrap.min.css",
  "../../assets/table/fonts/font-awesome-4.7.0/css/font-awesome.min.css",
  "../../assets/table/vendor/animate/animate.css",
  "../../assets/table/vendor/select2/select2.min.css",
  "../../assets/table/vendor/perfect-scrollbar/perfect-scrollbar.css",
  "../../assets/table/css/util.css",
  "../../assets/table/css/main.css"]
})
export class DashboardComponent implements OnInit {

  orders:any
  ShippingCount;
  StoreArray=[];
  SkuStoreStats;
  AllStats;
  Date;
  ShopId;
  StoreBreakdown=[];
  SkuArray=[];
  constructor(private order:OrdersService) { }

  ngOnInit(): void {
    // this.getOrders();


    this.AllStoreStats(1);
    
    

    
    

  }

  DateSelected(event){
    // console.log(event.value);
    this.Date = event.value;
    this.SkuDetails(this.ShopId,this.Date);
    this.AllStoreStats(this.Date);
  }

  StoreSelected(event){
    // console.log(event.value)
    this.ShopId = event.value;
    this.SkuDetails(this.ShopId,this.Date);
    // document.getElementById('main').style.height="300%";
    
  }

  SkuDetails(id,date){
    this.order.get('Skustats/'+id+'/'+date).subscribe(response=>{
      console.log(response);
      this.SkuStoreStats = response;
    })
  }

  AllStoreStats(date){
    this.order.get('allstats/'+date).subscribe(response=>{
      // console.log(response);
      this.AllStats = response;

      if(this.StoreArray.length<=0){
      this.AllStats.forEach(o => {
        if(o._id!='all'){
        this.StoreArray.push(o._id);
        }
      });
      
    }
    
    })
    
  }

  // async getOrders(){
  //   this.order.getById('all').subscribe(async response=>{
  //      this.orders = await response;
  //     console.log(this.orders);
  //     console.log(Object.keys(this.orders).length);
  //     this.ShopValues();
  //     this.ShippingFilter(this.orders);
  //     this.ShippingBreakdown(this.orders);
  //     this.SkuBreakdown(this.orders);
  //   })

  // }

//   ShippingFilter(orders){
    

    
//     var fbm = Object.keys(orders.filter(o=>{
//       return o.ShippingType=="Own Warehouse"
//     })).length
  
    
//     var fbd = Object.keys(orders.filter(o=>{
//       return o.ShippingType=="Dropshipping"
//     })).length
    
  
//     this.ShippingCount = {"FBD":fbd,"FBM":fbm};
//     console.log(this.ShippingCount);
  
// }

// ShippingBreakdown(orders){
//   this.StoreArray.forEach((i)=>{
//     var fbm = orders.filter(o=>{
//       return (o.ShopId == i && o.ShippingType=="Dropshipping");
//     })

//     var fbmcount = Object.keys(fbm).length;

//     var fbd = orders.filter(o=>{
//       return (o.ShopId == i && o.ShippingType=="Own Warehouse");
//     })

//     var fbdcount = Object.keys(fbd).length;

//     this.StoreBreakdown.push({"ShopId":i,"FBM":fbmcount,"FBD":fbdcount})
//     console.log(this.StoreBreakdown);
//   })
// }

// SkuBreakdown(orders){
//   var skuobj={"Store":"","Sku":"","FBD":0,"FBM":0,"Total":0};
//   this.StoreArray.forEach((i)=>{
//     var storeorders = orders.filter(o=>{
//       return (o.ShopId == i)
//     })
//     for(var order,j=0;order=storeorders[j++];){
      
//       this.SkuArray.forEach((s)=>{
        
//       })
//       var sku = order.Sku;
//       skuobj.Store=i;
//       if(skuobj[sku]==null) skuobj[sku] = 1;
//       else skuobj[sku]=skuobj[sku]+1;
//     }

//   })
//   console.log(skuobj);
// }



// ShopValues(){
//   var items=this.orders;
//   console.log(items);
  

//   for(var item,i=0;item=items[i++];){
//       var store = item.ShopId;

//       if(!(this.StoreArray.includes(store))){
//         // lookup[store] = 1;
//         this.StoreArray.push(store);
//       }
//   }
//   console.log(this.StoreArray);
// }


}
