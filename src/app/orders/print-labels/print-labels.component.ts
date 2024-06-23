import { AuthService } from 'src/app/services/auth.service';
import { LabelService } from '../../services/label.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-print-labels',
  templateUrl: './print-labels.component.html',
  styleUrls: ['./print-labels.component.scss']
})
export class PrintLabelsComponent implements OnInit {
  ordersIdArray=[]
  orders:any
  labelsCount:any
  pageIndex=0
  permissions:any
  constructor(private labels:LabelService,private auth:AuthService) { }
  
  ngOnInit(): void {
    console.log(this.labels.getOrders().length)
    this.orders=this.labels.getOrders()
    this.labelsCount=this.labels.getLabelCount().length
    console.log(this.labels.getLabelCount())
    console.log(this.labelsCount)
    this.permissions=this.auth.getPermissions();
    // this.labels.postDataByCap('/getLabelsData',{Orders:this.ordersIdArray}).subscribe(res=>{
    //   this.orders = res
    // })
  }

  adjustedDate(date){
    var result = new Date(date)
    result.setHours(result.getHours()-5)
    return result
  }
  getTrackings(order){
    var trackings=[]
      for(var item of order.OrderItems){
        if(trackings.includes(item.labelTracking)==false && item.labelTracking!=""){
          trackings.push(item.labelTracking)
        }
      }
      return trackings
  }
  getLabelTrackingBarcode(tracking,orderitems){
    for(var item of orderitems){
      if(item.Status=='canceled') continue;
      if(item.labelTracking==tracking){
        return item.trackingBarcode
      }
    }
    
  }
  getLabelProperty(tracking,orderitems,property){
    for(var [index,item] of orderitems.entries()){
      if(item.Status=='canceled') continue;
      if(item.labelTracking==tracking){
        if(property==undefined) return index;
        return item[property]
      }
    }
    
  }

  getLabelItemCount(tracking,orderitems){
    var skus=[]
    for(var item of orderitems){
        if(item.Status=='canceled') continue;
        if(item.labelTracking==tracking){
          skus.push(item.Sku)
        }
        if(item.labelTracking==""){
          return 0
        }
    }
    return skus.length
  }

  getLabelSkus(tracking,orderitems){
    // console.log(orderitems)

    var skus=[]
    for(var item of orderitems){
        if(item.Status=='canceled') continue;
        if(item.labelTracking==tracking){
          skus.push(item.Sku)
        }
        if(item.labelTracking==""){
          return ["ERROR ! Please ready to ship all items first"]
        }
    }
    return skus
    // var togetherRtsSkus=[]
    // for(var item of orderitems){
    //   if(item.SeperateRts==false){togetherRtsSkus.push(item.Sku)}
    //   if(item.labelTracking==tracking){
    //     if(item.SeperateRts==true){
    //       skus.push(item.Sku)
    //       return skus
    //     }
    //   }
    // }
    // return togetherRtsSkus
  }

  // increaseIndex(){
  //   this.pageIndex=this.pageIndex+1
  // }

  // getImage(string){
  //  var imagePath = this.sanitizer.bypassSecurityTrustResourceUrl(string);
  //   return imagePath
  // }
}


