import { LabelService } from './../services/label.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {jsPDF} from 'jspdf'
import html2canvas from 'html2canvas'
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-print-labels',
  templateUrl: './print-labels.component.html',
  styleUrls: ['./print-labels.component.css']
})
export class PrintLabelsComponent implements OnInit {
  ordersIdArray=[]
  orders:any
  labelsCount:any
  constructor(private labels:LabelService,private sanitizer:DomSanitizer) { }
  
  ngOnInit(): void {
    console.log(this.labels.getOrders().length)
    this.orders=this.labels.getOrders()
    this.labelsCount=this.labels.labelsCount()
    console.log(this.labelsCount.length)
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
        if(trackings.includes(item.TrackingCode)==false){
          trackings.push(item.TrackingCode)
        }
      }
      return trackings
  }
  getLabelTrackingBarcode(tracking,orderitems){
    for(var item of orderitems){
      if(item.TrackingCode==tracking){
        return item.trackingBarcode
      }
    }
    
  }
  getLabelProperty(tracking,orderitems,property){
    for(var item of orderitems){
      if(item.TrackingCode==tracking){
        return item[property]
      }
    }
    
  }

  getLabelItemCount(tracking,orderitems){
    var count=0
    for(var item of orderitems){
      if(item.TrackingCode==tracking){
        count=count+1
      }
    }
    return count
    
  }

  // getImage(string){
  //  var imagePath = this.sanitizer.bypassSecurityTrustResourceUrl(string);
  //   return imagePath
  // }
}


