import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderItemsService } from '../services/orderItems.service';
import { OrdersService } from '../services/orders.service';
import { SkusService } from '../services/skus.service';

@Component({
  selector: 'app-add-returned-stock',
  templateUrl: './add-returned-stock.component.html',
  styleUrls: ['./add-returned-stock.component.css']
})
export class AddReturnedStockComponent implements OnInit {

  Trackings=[]
  StockLength=false
  ReturnedStockCheckList:any=[]
  loadingIndicator=true

  constructor(@Inject(MAT_DIALOG_DATA) private data:any,
  private order:OrdersService,private sku:SkusService,private dialog:MatDialogRef<AddReturnedStockComponent>,
  private orderitems:OrderItemsService) { }

  ngOnInit(): void {
    this.getReturnStock()
  }

  getReturnStock(){
    for(var order of this.data){
      this.Trackings.push(order._id)
    }
    this.order.postDataByCap('/getStockChecklist',{trackings:this.Trackings}).subscribe(res=>{
      this.ReturnedStockCheckList=res
      this.loadingIndicator=false
      if(this.ReturnedStockCheckList.length>0)this.StockLength=true
    })
  }

  AddReturnedStock(){
    this.sku.postDataByCap('AddReturnedStock',{stock:this.ReturnedStockCheckList}).subscribe(res=>{

      this.orderitems.updateData('ReturnedStockAdded',"",{orderitems:this.data}).subscribe(res=>{
        this.dialog.close({dialogResult:"StockAdded"})
      })

    })


  }



}
