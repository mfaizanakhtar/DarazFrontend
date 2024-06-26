import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { DarazskuService } from '../../services/darazsku.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dsc-sku-edit',
  templateUrl: './dsc-sku-edit.component.html',
  styleUrls: ['./dsc-sku-edit.component.scss']
})
export class DscSkuEditComponent implements OnInit {
  LoggedUser
  DscSku:any
  FBDchange=0
  FBMchange=0
  GroupSkuChange=false
  GroupSkuChangeStock=0
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) private data:any,private darazsku:DarazskuService,private sheet:MatBottomSheetRef<DscSkuEditComponent>,
  private auth:AuthService) { }

  ngOnInit(): void {
    this.LoggedUser=this.auth.getCurrentUser()
    this.DscSku=this.data.sku
    this.FBDchange=this.data.FBDchange
    this.FBMchange=this.data.FBMchange
  }
  
  setGroupStock(change){
    this.GroupSkuChange=change
    if(change){
      this.GroupSkuChangeStock=this.FBDchange*-1
    }
    if(!change){
      this.GroupSkuChangeStock=0
    }
  }

  update(){
    this.darazsku.updateData('',this.DscSku._id,{FBMchange:this.FBMchange,FBDchange:this.FBDchange,
      cost:this.DscSku.cost,FBDpackagingCost:this.DscSku.FBDpackagingCost,FBMpackagingCost:this.DscSku.FBMpackagingCost,
      GroupSkuChangeStock:this.GroupSkuChangeStock})
    .subscribe(res=>{
      this.sheet.dismiss()
    })
  }

}
