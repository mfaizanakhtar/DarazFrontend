import { AuthService } from 'src/app/services/auth.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AddidService } from '../../services/addid.service';

@Component({
  selector: 'app-add-shop',
  templateUrl: './add-shop.component.html',
  styleUrls: ['./add-shop.component.scss']
})
export class AddShopComponent implements OnInit {
  value:any
  shopId:any
  secretKey:any
  shopName:any
  shopAddress:any
  shopState:any
  shopArea:any
  shopLocation:any
  shopPhone:any
  permissions:any

  constructor(@Inject(MAT_DIALOG_DATA) private idData:any,private addid:AddidService,private toastr:ToastrService,private dialogRef:MatDialogRef<AddShopComponent>,private auth:AuthService) { }
  isUpdate:boolean
  ngOnInit(): void {
    this.updateCheck()
    console.log(this.idData)
    this.permissions = this.auth.getPermissions();
  }

  shopAdd(){
    if(this.isUpdate){
      this.addid.updateData('update','',
      {_id:this.idData._id,shopid:this.shopId,secretkey:this.secretKey,shopAddress:this.shopAddress,
        shopState:this.shopState,shopArea:this.shopArea,shopLocation:this.shopLocation,shopName:this.shopName,shopPhone:this.shopPhone})
      .subscribe(res=>{
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
        secretkey:this.secretKey,
        shopAddress:this.shopAddress,
        shopState:this.shopState,
        shopArea:this.shopArea,
        shopLocation:this.shopLocation,
        shopName:this.shopName,
        shopPhone:this.shopPhone

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
      this.shopAddress=this.idData.shopAddress
      this.shopState=this.idData.shopState
      this.shopArea=this.idData.shopArea
      this.shopLocation=this.idData.shopLocation
      this.shopName=this.idData.shopName
      this.shopPhone=this.idData.shopPhone

      document.getElementById('btnShop').innerHTML="Update Shop"
      
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
