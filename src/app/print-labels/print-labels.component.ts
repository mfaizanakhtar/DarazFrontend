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
  constructor(private labels:LabelService,private sanitizer:DomSanitizer) { }
  
  ngOnInit(): void {
    console.log(this.labels.getOrders().length)
    this.orders=this.labels.getOrders()
    // this.labels.postDataByCap('/getLabelsData',{Orders:this.ordersIdArray}).subscribe(res=>{
    //   this.orders = res
    // })
  }

  // getImage(string){
  //  var imagePath = this.sanitizer.bypassSecurityTrustResourceUrl(string);
  //   return imagePath
  // }
}


