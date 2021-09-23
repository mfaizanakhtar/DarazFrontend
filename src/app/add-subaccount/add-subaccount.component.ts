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
          this.dialog.close({dialogResult:res.message})
        }
        console.log(res)
      },(ex)=>{
        this.dialog.close({dialogResult:ex.error.message})
      })

  }
  else if(this.isEdit){

      this.user.updateData('/updateSubAccount',"",this.User).subscribe((res:any)=>{
        if(res.n>0){
          this.dialog.close({dialogResult:"Permissions Modified"})
        }
        else{
          this.dialog.close({dialogResult:"Error updating permissions"})
        }
      })
  }
  }
  deleteAccount(){
    this.user.postDataByCap('/deleteSubAccount',this.User).subscribe((res:any)=>{
      if(res.n>0){
        this.dialog.close({dialogResult:"User deleted"})
      }
      else{
        this.dialog.close({dialogResult:"Error Deleting user"})
      }
    })
  }

}
