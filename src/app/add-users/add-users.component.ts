import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UseremailService } from '../services/useremail.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {
  userEmail:any
  userType:any="user"
  isEdit:boolean=false
  subscriptionMonths=0
  subscriptionEndDate:Date


  constructor(@Inject(MAT_DIALOG_DATA) private data:any,private user:UseremailService,private toastr:ToastrService,private dialogRef:MatDialogRef<AddUsersComponent>) { }

  ngOnInit(): void {

    if(this.data){
      console.log(this.data)
      this.isEdit=true;

      document.getElementById("headingLabel").innerHTML="Edit User Details"
      document.getElementById("buttonSubmit").innerHTML="Edit"

      this.userEmail=this.data.useremail;
      this.userType=this.data.usertype;
      this.subscriptionEndDate=new Date(this.data.subscriptionEndDate)
    }
  }

  createUser(){
    if(this.isEdit!=true){
      this.user.postData({useremail:this.userEmail,password:"password.123",usertype:this.userType}).subscribe(res=>{
        if(res){
          this.toastr.success("User Created");
          this.dialogRef.close()
  
        }
      },
      error=>{
        if(error.status==400){
          this.toastr.error("User Already Exists");
        }
      })
    }
    if(this.isEdit=true){
      this.user.updateData("/updateUser",this.userEmail,{useremail:this.userEmail,usertype:this.userType}).subscribe(res=>{
        console.log(res)
        this.dialogRef.close()
      })
    }

  }

  AddSubscription(){
    this.subscriptionEndDate.setMonth(this.subscriptionEndDate.getMonth()+this.subscriptionMonths)
    console.log(this.subscriptionEndDate.toISOString())
    this.user.updateData("addSubscription",this.data.useremail,{subscriptionEndDate:this.subscriptionEndDate}).subscribe((res:any)=>{
      if(res.n>0){
        this.dialogRef.close({dialogResult:"Subscription Added"})
      }
      else{
        this.toastr.error("Error occured")
      }
    })
  }

  resetPassword(){
    this.user.updateData('resetPassword',this.data.loginemail,{}).subscribe((res:any)=>{
      console.log(res)
      if(res.n>0){
        this.dialogRef.close({dialogResult:"Password Reset Successful"})
      }
      else{
        this.toastr.error("Error occured")
      }
    })
  }

  deleteUser(){
    this.user.postDataByCap("/deleteUser",{useremail:this.userEmail}).subscribe(res=>{
      if(res){
        this.toastr.success("User Deleted");
        this.dialogRef.close()
      }
      
    },
    error=>{
      console.log(error)
    })
  }

}
