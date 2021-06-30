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
  }

}
