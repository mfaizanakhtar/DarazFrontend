import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LabelService extends DataService {
  ordersData=[];
  labelsCount=[];
  stock=[];
  constructor(http:HttpClient) { 
    super('orders',http)
  }

  setOrders(orders){
    this.ordersData=[]
    this.ordersData=orders.labelsData
    this.labelsCount=orders.labelsCount
    // for(var order of orders){
    //   this.ordersData.push(order.OrderId)
    // }
    // this.ordersData = this.ordersData.substr(0,this.ordersData.length-1)
  }

  getOrders(){
    return this.ordersData
  }
  getLabelCount(){
    return this.labelsCount
  }

  setStockChecklist(stock){
    this.stock=stock
  }
  getStockChecklist(){
    return this.stock
  }
}
