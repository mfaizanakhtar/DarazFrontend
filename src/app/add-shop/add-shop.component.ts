import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AddidService } from '../services/addid.service';

@Component({
  selector: 'app-add-shop',
  templateUrl: './add-shop.component.html',
  styleUrls: ['./add-shop.component.css']
})
export class AddShopComponent implements OnInit {
  value:any
  shopId:any
  secretKey:any
  isDelete=false

  constructor(@Inject(MAT_DIALOG_DATA) private idData:any,private addid:AddidService,private toastr:ToastrService,private dialogRef:MatDialogRef<AddShopComponent>) { }
  isUpdate:boolean
  ngOnInit(): void {
    this.updateCheck()
    console.log(this.idData)
  }

  shopAdd(){
    if(this.isUpdate){
      this.addid.updateData('update','',{_id:this.idData._id,shopid:this.shopId,secretkey:this.secretKey}).subscribe(res=>{
        var updateRes:any = res
        if(updateRes.nModified==1){
          this.toastr.success("Shop Updated")
          this.dialogRef.close();
        }
        else{
          this.toastr.error("Error Updating Shop Details")
        }
      })
    }
    else{

      this.addid.postData({
        shopid:this.shopId,
        secretkey:this.secretKey
      })
      .subscribe(response=>{
        var res:any = response;
        if(res.message=="Success"){
          this.toastr.success("Shop Added Successfully")
          this.dialogRef.close();
        }
        else{
          this.toastr.error("Error Adding Shop")
        }
      })

    }

  }

  updateCheck(){
    if(this.idData){
      this.isUpdate = true
      this.shopId=this.idData.shopid
      this.secretKey=this.idData.secretkey
      document.getElementById('btnShop').innerHTML="Update Shop"
      this.isDelete=true
      
    }
    else{
      this.isUpdate = false
    }
  }

  shopDelete(){
    this.addid.deleteData(this.shopId).subscribe(res=>{
      var deleteRes:any=res
      if(deleteRes.deletedCount==1){
        this.toastr.success("Shop Deleted Successfully")
        this.dialogRef.close()
      }
    })
  }
}
