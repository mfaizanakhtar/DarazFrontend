import { AddidService } from '../services/addid.service';
import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddShopComponent } from '../add-shop/add-shop.component';

@Component({
  selector: 'app-shop-id',
  templateUrl: './shop-id.component.html',
  styleUrls: ['./shop-id.component.css']
})
export class ShopIdComponent implements OnInit {

  constructor(private addid:AddidService,private dialog:MatDialog) { }
  darazIds:any
  ColumnMode=ColumnMode
  loadingIndicator=false;

  ngOnInit(): void {
    this.getIds()
  }

  addids(value){
    this.addid.postData({
      shopid:value.email,
      secretkey:value.secretkey
    })
    .subscribe(response=>{
      console.log(response);
    })
  }

  getIds(){
    this.loadingIndicator=true;
    this.addid.getAll().subscribe(res=>{
      this.darazIds=res
      this.loadingIndicator=false;
      console.log(this.darazIds)
    })
  }

  onActivate(event){
    if(event.type=="click"){
      this.clickId(event.row)
    }
  }

  clickId(id){
    var dialogRef = this.dialog.open(AddShopComponent,{
      width:'1300px',height:'700px',data:id
    })
    
    dialogRef.afterClosed().subscribe(res=>{
      this.getIds()
    })
    
  }

  addNewIdDialog(){
    var dialogRef=this.dialog.open(AddShopComponent,{
      width:'1300px',height:'700px'
    })

    dialogRef.afterClosed().subscribe(res=>{
      this.getIds()
    })
  }

}
