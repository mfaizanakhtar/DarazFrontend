import { LabelService } from './../services/label.service';
import { Component, OnInit } from '@angular/core';
import {jsPDF} from 'jspdf'
import html2canvas from 'html2canvas'

@Component({
  selector: 'app-print-labels',
  templateUrl: './print-labels.component.html',
  styleUrls: ['./print-labels.component.css']
})
export class PrintLabelsComponent implements OnInit {
  orders:any
  constructor(private labels:LabelService) { }

  ngOnInit(): void {
    this.orders=this.labels.getOrders()
    console.log(this.orders)
    // this.print()
  }

  // print(){
  //   const printContent = document.getElementById("pdfLabels");
  //   const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
  //   WindowPrt.document.write(printContent.innerHTML);
  //   WindowPrt.document.close();
  //   WindowPrt.focus();
  //   WindowPrt.print();
  //   // WindowPrt.close();
  // }

}
