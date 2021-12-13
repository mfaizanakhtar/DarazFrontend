import { AddidService } from '../../services/addid.service';
import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddShopComponent } from '../add-shop/add-shop.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shop-id',
  templateUrl: './shop-id.component.html',
  styleUrls: ['./shop-id.component.scss']
})
export class ShopIdComponent implements OnInit {

  constructor(private addid:AddidService,private dialog:MatDialog) { }
  darazIds:any
  ColumnMode=ColumnMode
  loadingIndicator=false;
  breadCrumbItems: Array<{}>;

  ngOnInit(): void {
    this.getIds()
    this.breadCrumbItems = [{ label: 'Home' }, { label: 'Shops', active: true },];
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
    // if(event.type=="click"){
    //   this.clickId(event.row)
    // }
  }

  deleteShop(row){

    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#ff3d60',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
      this.addid.deleteData(row.shopid).subscribe(res=>{
        var deleteRes:any=res
        if(deleteRes.deletedCount==1){
        Swal.fire('Deleted!', 'Your Shop has been deleted.', 'success');
        this.getIds()
        }
      })
    }

    });
    

  }

  editShop(id){
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

        Swal.fire({
          title: 'Sucess',
          text: 'Shop is added sucessfully',
          icon: 'success',
          confirmButtonColor: '#5438dc'
        });

      this.getIds()
    })
  }

}
