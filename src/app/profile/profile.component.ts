import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UseremailService } from '../services/useremail.service';
import { DatatableComponent,ColumnMode,SelectionType } from'@swimlane/ngx-datatable'
import { MatDialog } from '@angular/material/dialog';
import { AddSubaccountComponent } from '../add-subaccount/add-subaccount.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  subaccounts:any=[]
  ColumnMode=ColumnMode
  loadingIndicator=true
  constructor(private toastr:ToastrService,private user:UseremailService,private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  submit(f){
    if(f.value.newPassword==f.value.reNewPassword){
      this.user.updateData('/updatePassword','',{oldPassword:f.value.oldPassword,newPassword:f.value.newPassword}).subscribe(res=>{
        var response:any = res
        if(response.message=="Password Updated"){
          f.reset()
          this.toastr.success("Password updated")
        }
        else if(response.message=="Incorrect Old Password"){
          f.reset()
          this.toastr.warning("Incorrect Current Password")
        }
        else this.toastr.error("An Error occur. Try again later")
      })
    }
    else{
      this.toastr.warning("Retype passwords do not match")
    }
  }

  getSubAccounts(){
    this.loadingIndicator=true
    console.log("SubAccClicked")
    this.user.get('/getSubAccounts').subscribe(res=>{
      this.subaccounts=res
      this.loadingIndicator=false
    })
  }

  editSubAccount(account){
    var dialogRef = this.dialog.open(AddSubaccountComponent,{height:"60%",width:"50%",data:account})
    dialogRef.afterClosed().subscribe(res=>{
      if(res!=undefined){
        if(res.dialogResult=="Permissions Updated" || res.dialogResult=="Permissions Modified" || res.dialogResult=="User deleted") 
        this.toastr.success(res.dialogResult)

        else{
          this.toastr.error("Error Occured")
        }
      }
      this.getSubAccounts()
    })
  }

  CreateSubAccount(){
    var dialogRef = this.dialog.open(AddSubaccountComponent,{height:"60%",width:"50%"})
    dialogRef.afterClosed().subscribe(res=>{
      if(res.dialogResult=="User Registered") this.toastr.success(res.dialogResult)
      this.getSubAccounts()
    })
  }

  matTabChanged(event){
    if(event.index==1) this.getSubAccounts()
  }

}
