import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-orders-view',
  templateUrl: './orders-view.component.html',
  styleUrls: ['./orders-view.component.css']
})
export class OrdersViewComponent implements OnInit {
  orders:any
  Fulfillment='Dropshipping';
  Store='all';
  StatusFilter='all';
  StoreArray=[];
  raworders:any;
  filtered:any;
  ColumnMode = ColumnMode;
  loadingIndicator = false;
  reorderable = true;
  SelectionType = SelectionType;
  selected=[];
  temp=[];
  status:any
  //for Indexing
  pSize=10
  pIndex=0
  //forselection
  selectedVal

  //paginator
pageEvent: PageEvent;
datasource: null;
pageIndex:number;
pageSize:number;
length:number;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private orderService:OrdersService) { }

  ngOnInit(): void {
    this.getOrders(this.pSize,this.pIndex,'')
    this.selectedVal='all'
  }

  getOrders(pageSize,pageNumber,OrderId){
    console.log(OrderId)
    this.pSize=pageSize;
    this.pIndex=pageNumber;
    this.loadingIndicator = true;
    this.orderService.get('/'+this.StatusFilter+'?'+'pageSize='+pageSize+"&pageNumber="+pageNumber+OrderId).subscribe(res=>{
      console.log(res)
      this.orders=res[0]
      this.length=res[1]
      this.loadingIndicator = false;
    })
  }

  StatusFilterClicked(status){
    this.StatusFilter=status
    this.getOrders(this.pSize,this.pIndex,'')
  }

  formatDate(date){
    var d = new Date(date);
    var formattedDate=d.toLocaleDateString('en-US',{weekday:'long'})+' '+ d.getDate()+'-'+d.getMonth()+'-'+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes()
    return formattedDate
  }

  getServerData(event?:PageEvent){
    console.log(event)
    this.getOrders(event.pageSize,event.pageIndex,'')
  }

  findOrder(f){
    console.log(f.value.OrderId)
    if(f.value.OrderId=='' || f.value.OrderId==null){
    this.getOrders(10,0,'')

    }
    else this.getOrders(10,0,"&OrderId="+f.value.OrderId)
  }
//NGX-DATATABLE
  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    for(const sel of selected){
      this.selected.push(sel);
    }
    console.log(this.selected);
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }


}
