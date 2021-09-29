import { DataService } from '../services/data.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderItemsService } from '../services/orderItems.service';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { DatatableComponent } from '@swimlane/ngx-datatable';
// import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss',
              "../../assets/table/vendor/bootstrap/css/bootstrap.min.css",
              "../../assets/table/fonts/font-awesome-4.7.0/css/font-awesome.min.css",
              "../../assets/table/vendor/animate/animate.css",
              "../../assets/table/vendor/select2/select2.min.css",
              "../../assets/table/vendor/perfect-scrollbar/perfect-scrollbar.css",
              "../../assets/table/css/util.css",
              "../../assets/table/css/main.css"
              
              ]
  
})
export class OrdersComponent implements OnInit {
  // isFbd='true';
  Fulfillment='Dropshipping';
  Store='All';
  StoreArray=[];
  raworders:any;
  orders:any;
  filtered:any;
  ColumnMode = ColumnMode;
  loadingIndicator = true;
  reorderable = true;
  SelectionType = SelectionType;
  selected=[];
  temp=[];
  status:any
  @ViewChild(DatatableComponent) table: DatatableComponent;
  


  constructor(private order:OrderItemsService) { }

  ngOnInit(): void {

    this.Filter('pending');
    
  }

  FulfillmentSelected(event){
    this.Fulfillment = event.value;
    this.DropSelectFilter(this.raworders,this.Fulfillment,this.Store)
  }

  StoreSelected(event){
    this.Store = event.value;
    this.DropSelectFilter(this.raworders,this.Fulfillment,this.Store)
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }
  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    for(const sel of selected){
      this.selected.push(sel);
    }
    console.log(this.selected);
  }

  add() {
    this.selected.push(this.orders[1], this.orders[3]);
  }

  update() {
    this.selected = [this.orders[1], this.orders[3]];
  }

  displayCheck(row) {
    return row.name !== 'Ethel Price';
  }

  updateFilter(event) {
    const val = event.target.value;
    
    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.OrderId.indexOf(val) !== -1 || !val;
    });


    // update the rows
    this.orders = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  Filter(status){
    this.status = status;
    this.selected=[]
    this.order.getById('data',status)
    .subscribe(async response=>{
      this.raworders=response;
      await this.DropSelectFilter(this.raworders,this.Fulfillment,this.Store)
      this.ShopValues();
      
      this.temp=this.orders
      // console.log(this.orders);
    })
  }

  DropSelectFilter(raworders,Fulfillment,store)
  {
    if(Fulfillment!='All'){
    this.orders = raworders.filter((item)=>{
      return item.ShippingType==Fulfillment
    })
  }
  else {
    this.orders = this.raworders;
  }
  if(store!='All'){
    this.orders = this.orders.filter((item)=>{
      return item.ShopId==this.Store;
    })
  }
  }

  ShopValues(){
    var items=this.orders;
    console.log(items);
    

    for(var item,i=0;item=items[i++];){
        var store = item.ShopId;

        if(!(this.StoreArray.includes(store))){
          // lookup[store] = 1;
          this.StoreArray.push(store);
        }
    }
    console.log(this.StoreArray);
  }

  UpdateStatus(Status){
    console.log(Status)
    this.order.updateData("Update",Status,this.selected).subscribe(res=>{
      this.Filter(this.status);
    })
  }








}
