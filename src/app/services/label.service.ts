import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LabelService {
  ordersData;
  constructor() { 
    this.ordersData=[]
  }

  setOrders(orders){
    this.ordersData=orders
  }

  getOrders(){
    return this.ordersData
  }
}
