import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { timeoutWith } from 'rxjs/operators';
import { SkusService } from '../services/skus.service';

@Component({
  selector: 'app-sku-edit-sheet',
  templateUrl: './sku-edit-sheet.component.html',
  styleUrls: ['./sku-edit-sheet.component.css']
})
export class SkuEditSheetComponent implements OnInit {
  skuData:any
  stockChange=0
  progressSpinner=false

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) private data:any,private sku:SkusService,private sheet:MatBottomSheetRef<SkuEditSheetComponent>) { }

  ngOnInit(): void {
    this.skuData=this.data
    console.log(this.data)
  }

  update(){
    this.progressSpinner=true

    this.sku.postDataByCap('/updateSku',{name:this.skuData.name,stockChange:this.stockChange,
      cost:this.skuData.cost,FBDpackagingCost:this.skuData.FBDpackagingCost,FBMpackagingCost:this.skuData.FBMpackagingCost}
      )
      .subscribe(res=>{

      console.log(res)
      var response:any=res
      this.skuData=response.result
      this.progressSpinner=false
      this.sheet.dismiss()
    })
    console.log(this.stockChange)
    console.log(this.skuData.cost)
  }

}
