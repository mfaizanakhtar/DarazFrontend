import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UseremailService } from '../services/useremail.service';

@Component({
  selector: 'app-add-subaccount',
  templateUrl: './add-subaccount.component.html',
  styleUrls: ['./add-subaccount.component.css']
})
export class AddSubaccountComponent implements OnInit {
  isEdit=false
  User={
    loginemail:"",
    username:"",
    Orders:true,
    ReturnsDispatch:true,
    Finance:true,
    DSCInventory:true,
    GroupedInventory:true,
    Profitibility:true

  }
  constructor(private user:UseremailService,private dialog:MatDialogRef<AddSubaccountComponent>,
    @Inject(MAT_DIALOG_DATA) private data:any) { }

  ngOnInit(): void {
    if(this.data!=null){
      this.User=this.data

      this.isEdit=true
      document.getElementById('buttonSubmit').innerHTML="Update Permissions"
    }
  }

  submitDetails(){
    if(!this.isEdit){

      this.user.postDataByCap('/addSubAccount',this.User).subscribe((res:any)=>{
        if(res.message=="User Registered"){
          this.dialog.close({dialogResult:{success:true,message:res.message}})
        }
        console.log(res)
      },(ex)=>{
        this.dialog.close({dialogResult:{success:false,message:ex.error.message}})
      })

  }
  else if(this.isEdit){

      this.user.updateData('/updateSubAccount',"",this.User).subscribe((res:any)=>{
        if(res.n>0){
          this.dialog.close({dialogResult:{success:true,message:"Permissions Modified"}})
        }
        else{
          this.dialog.close({dialogResult:{success:false,message:"Error updating permissions"}})
        }
      })
  }
  }
  deleteAccount(){
    this.user.postDataByCap('/deleteSubAccount',this.User).subscribe((res:any)=>{
      if(res.n>0){
        this.dialog.close({dialogResult:{success:true,message:"User deleted"}})
      }
      else{
        this.dialog.close({dialogResult:{success:false,message:"Error Deleting user"}})
      }
    })
  }

  resetPassword(){
    this.user.updateData('/resetSubPassword',this.User.loginemail,{}).subscribe((res:any)=>{
      if(res.n>0){
        this.dialog.close({dialogResult:{success:true,message:"Password Reset to 'password.123'"}})
      }
      else{
        this.dialog.close({dialogResult:{success:false,message:"Error Resetting Password"}})
      }
    })
  }

}
