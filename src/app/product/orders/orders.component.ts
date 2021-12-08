import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Order } from './orders.model';

import { OrderService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [OrderService, DecimalPipe]

})
export class OrdersComponent implements OnInit {


  // breadcrumb items
  breadCrumbItems: Array<{}>;

  // Table data
  ordersData: Order[];
  searchTerm:any;
  pageSize:any=10;


  constructor() {
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Home' }, { label: 'DSC Inventory', active: true },];

    
  }


}
