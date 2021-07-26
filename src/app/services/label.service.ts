import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LabelService extends DataService {
  ordersData=[];
  constructor(http:HttpClient) { 
    super('orders',http)
  }

  setOrders(orders){
    this.ordersData=[]
    this.ordersData=orders
    // for(var order of orders){
    //   this.ordersData.push(order.OrderId)
    // }
    // this.ordersData = this.ordersData.substr(0,this.ordersData.length-1)
  }

  getOrders(){
    return this.ordersData
  }
}
