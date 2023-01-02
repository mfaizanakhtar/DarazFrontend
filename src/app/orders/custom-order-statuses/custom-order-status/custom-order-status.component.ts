import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomOrderStatusService } from './../../../services/custom-order-status.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LookupService } from './../../../services/lookup.service';
import { orderFilter } from './orderFilter';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-order-status',
  templateUrl: './custom-order-status.component.html',
  styleUrls: ['./custom-order-status.component.scss']
})
export class CustomOrderStatusComponent implements OnInit {

  constructor(private lookupService:LookupService,private customStatusSerivce:CustomOrderStatusService,private currDialogRef:MatDialogRef<CustomOrderStatusComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData:any) { }
  
  statusName:String
  addRuleScreen:Boolean=false;
  orderFilters=orderFilter;
  filterTypes:any
  editMode:Boolean=false
  viewStatusFilters:any=[];
  customOrderFormGroup=new FormGroup({
    orderStatusName:new FormControl({value:''},[Validators.required])
  })

  ngOnInit(): void {
    this.getFilterTypeLookup();
    this.getFiltersLookup();
    if(this.dialogData) {
      this.editMode=true
      this.editModeEnabled()
    }
  }

  toggleStatusOverViewAndRuleScreen(addedRule?:any){
    if(addedRule){
      if(addedRule.filterName=='CustomOrderStatus'){
        addedRule.value=this.statusName;
      }
      this.removeFilterSizeError()
      this.viewStatusFilters.push(addedRule);
      this.disableEnableStatusName()
    }
    console.log("btn clicked");
    this.addRuleScreen=!this.addRuleScreen;
  }

  valSelected(value){
    console.log(value)
  }

  getFilterTypeLookup(){
    this.lookupService.getLookupDetail('customOrderFilterTypes').subscribe(res=>{
      this.filterTypes=res;
    },(error:any)=>{
      console.log(error);
    })
  }


  getFiltersLookup(){
    this.lookupService.getLookupDetail('customOrderFilters').subscribe(res=>{
      this.orderFilters=res;
    },(error:any)=>{
      console.log(error);
    })
  }

  filterDeleted(rowIndex){
    debugger
    console.log(this.viewStatusFilters)
    this.viewStatusFilters.splice(rowIndex,1)
    this.disableEnableStatusName()
  }

  submitCustomStatus(){
    debugger
    if(this.viewStatusFilters.length==0){
      this.customOrderFormGroup.get('orderStatusName').setErrors({custom:"Custom Order Status Must have One Filter Atleast"})
      return
    }else{
      this.removeFilterSizeError()
    }
    this.removeNotUniquError()
    if(this.customOrderFormGroup.valid || this.customOrderFormGroup.disabled){
      var payLoad=this.customOrderFormGroup.value;
      payLoad.isEdit=false;
      payLoad.statusArray=this.viewStatusFilters
      this.customStatusSerivce.postDataByCap('/createStatus',payLoad).subscribe((resp:any)=>{
        console.log(resp)
        this.currDialogRef.close({createdCustomStatus : resp.createdCustomStatus,isCreated:true})
      },(errorResp)=>{
        debugger
        console.log(errorResp)
        if(errorResp?.error?.message?.notUnique===true){
          this.customOrderFormGroup.get('orderStatusName').setErrors({notUnique:true})
        }
      })
      console.log(payLoad)
    }
  }

  removeFilterSizeError(){
    let allErrors = this.customOrderFormGroup.get('orderStatusName').errors
    if(allErrors?.custom){
      delete allErrors['custom']
      this.customOrderFormGroup.get('orderStatusName').setErrors({...allErrors})
    }
  }

  removeNotUniquError(){
    let allErrors = this.customOrderFormGroup.get('orderStatusName').errors
    if(allErrors?.notUnique){
      delete allErrors['notUnique']
      this.customOrderFormGroup.get('orderStatusName').setErrors({...allErrors})
    } 
  }

  disableEnableStatusName(){
    if(this.editMode) return;
    if(this.viewStatusFilters?.filter(rule=>rule?.filterName=='CustomOrderStatus')?.length>0){
      this.customOrderFormGroup.get('orderStatusName').disable();
    }else{
      this.customOrderFormGroup.get('orderStatusName').enable();
    }
  }

  editModeEnabled(){
    debugger
    this.customOrderFormGroup.get('orderStatusName').setValue(this.dialogData.statusName);
    this.statusName=this.dialogData.statusName
    this.customOrderFormGroup.get('orderStatusName').disable();
    this.viewStatusFilters=this.dialogData.statusArray;
  }

  deleteCustomStatus(){
    debugger
    this.customStatusSerivce.deleteDataByCap('/deleteCustomStatus',this.dialogData.statusName).subscribe((res:any)=>{
      if(res.deletedCount>0){
        this.currDialogRef.close({isDeleted:true})
      }
    },error=>{
      console.log(error)
    })
  }



}
