import { AuthService } from 'src/app/services/auth.service';
import { LookupService } from './../../services/lookup.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserdataService } from '../../services/userdata.service';

@Component({
  selector: 'app-add-subaccount',
  templateUrl: './add-subaccount.component.html',
  styleUrls: ['./add-subaccount.component.scss']
})
export class AddSubaccountComponent implements OnInit {
  isEdit=false
  permissions:any={}
  User={
    loginemail:"",
    username:"",
    permissions:Object
  }
  constructor(private user:UserdataService,private dialog:MatDialogRef<AddSubaccountComponent>,
    @Inject(MAT_DIALOG_DATA) private data:any,private auth:AuthService) { }

  ngOnInit(): void {
    if(this.data!=null){
      this.User=this.data

      this.isEdit=true
      document.getElementById('buttonSubmit').innerHTML="Update Permissions"
    }
    this.getPermissions();
  }

  submitDetails(){
    console.log(this.permissions)
    this.User.permissions = this.permissions
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

  getPermissions(){
    var userPermissions:any = this.auth.getPermissions()
    console.log(userPermissions)
    for(var key in userPermissions){
      if(userPermissions[key].value){
        this.permissions[key]=userPermissions[key] 
      }
    }
  }

}
