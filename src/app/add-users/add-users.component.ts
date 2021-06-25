import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UseremailService } from '../services/useremail.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements AfterViewInit {
  userEmail:any
  userType:any
  isEdit:boolean=false

  constructor(@Inject(MAT_DIALOG_DATA) private data:any,private user:UseremailService,private toastr:ToastrService,private dialogRef:MatDialogRef<AddUsersComponent>) { }

  ngAfterViewInit(): void {
    
    if(this.data){
      console.log(this.data)
      this.isEdit=true;
      document.getElementById("headingLabel").innerHTML="Edit User Details"
      document.getElementById("buttonSubmit").innerHTML="Edit"
      this.userEmail=this.data.useremail;
      this.userType=this.data.usertype;
    }
  }

  createUser(){
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

}
