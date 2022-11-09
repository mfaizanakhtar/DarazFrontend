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
  invalid={loginEmail:false,userName:false}
  User={
    loginEmail:"",
    userName:"",
    permissions:Object,
    bypassSubAccVerification:false
  }
  userPermissions:any
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
    debugger
    this.validateField(this.User.loginEmail,"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$") ? this.invalid.loginEmail=false : this.invalid.loginEmail=true
    if(!this.isByPassSubAccVerification()) {
      this.invalid.userName=false;
    }else{
      this.validateField(this.User.userName,"^[a-zA-Z0-9]+$") ? this.invalid.userName=false : this.invalid.userName=true;
    }
    if(this.invalid.loginEmail || this.invalid.userName) return
    this.User.permissions = this.permissions
    if(!this.isEdit){
      this.User.bypassSubAccVerification = this.isByPassSubAccVerification() ? true : false
      
      this.user.postDataByCap('/addSubAccount',this.User).subscribe((res:any)=>{
        debugger
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
    this.user.updateData('/resetSubPassword',this.User.loginEmail,{}).subscribe((res:any)=>{
      if(res.n>0){
        this.dialog.close({dialogResult:{success:true,message:"Password Reset to 'password.123'"}})
      }
      else{
        this.dialog.close({dialogResult:{success:false,message:"Error Resetting Password"}})
      }
    })
  }

  getPermissions(){
    this.userPermissions = this.auth.getPermissions()
    if(!this.isEdit){  
      for(var key in this.userPermissions){
        if(this.userPermissions[key].value){
          if(this.userPermissions[key].hasOwnProperty("isSubAccount") && !this.userPermissions[key].isSubAccount) return 
          this.permissions[key]=this.userPermissions[key] 
        }
      }
    }else if(this.isEdit){
      this.permissions = this.User.permissions
      for(var key in this.userPermissions){
        if(!this.permissions.hasOwnProperty(key)){
          if(this.userPermissions[key].hasOwnProperty("isSubAccount") && !this.userPermissions[key].isSubAccount) return 
          this.permissions[key] = this.userPermissions[key];
          this.permissions[key].value=false;
        }
      }
    }

  }

  isByPassSubAccVerification(){
    if(this.userPermissions.hasOwnProperty("bypassSubAccVerification") && 
      this.userPermissions.bypassSubAccVerification.value==true) return true;
    else return false
  }

  validateField(field,regex){
    debugger
    const reg = new RegExp(regex)
    return reg.test(field);
  }

}
