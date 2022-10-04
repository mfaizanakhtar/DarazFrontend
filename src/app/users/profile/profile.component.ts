import { profileNavRoot, profileNavSub } from './profileNavData';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserdataService } from '../../services/userdata.service';
import { DatatableComponent,ColumnMode,SelectionType } from'@swimlane/ngx-datatable'
import { MatDialog } from '@angular/material/dialog';
import { AddSubaccountComponent } from '../add-subaccount/add-subaccount.component';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  LoggedUser
  subaccounts:any=[]
  ColumnMode=ColumnMode
  loadingIndicator=true
  breadCrumbItems: Array<{}>;
  tabType='password';
  profileNavData;
  selectedNav=1;
  constructor(private toastr:ToastrService,private user:UserdataService,private dialog:MatDialog,private auth:AuthService) { }

  ngOnInit(): void {
    this.LoggedUser=this.auth.getCurrentUser()
    debugger;
    this.LoggedUser.accountType=='root' ? this.profileNavData=profileNavRoot : this.profileNavData=profileNavSub;
    this.breadCrumbItems = [{ label: 'Home' }, { label: 'Profile', active: true },];
  }

  submit(f){
    if(f.value.newPassword==f.value.reNewPassword){
      this.user.updateData('/updatePassword','',{oldPassword:f.value.oldPassword,newPassword:f.value.newPassword}).subscribe(res=>{
        var response:any = res
        if(response.message=="Password Updated"){
          f.reset()
          // this.toastr.success("Password updated")
          Swal.fire({
            title: 'Password',
            text: 'You password is changed successfully!',
            icon: 'success',
            confirmButtonColor: '#5438dc'
          });
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
      console.log(this.subaccounts)
      this.loadingIndicator=false
    })
  }

  editSubAccount(account){
    var dialogRef = this.dialog.open(AddSubaccountComponent,{height:"70%",width:"50%",data:account})
    dialogRef.afterClosed().subscribe(res=>{
      if(res!=undefined){
        if(res.dialogResult.success) {
          Swal.fire({
            title: 'SubAccount',
            text: res.dialogResult.message,
            icon: 'success',
            confirmButtonColor: '#5438dc'
          });
        }
        

        else{
          this.toastr.error(res.dialogResult.message)
        }
      }
      this.getSubAccounts()
    })
  }

  deleteSubAccount(row){

    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#ff3d60',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {

      this.user.postDataByCap('/deleteSubAccount',{loginEmail:row.loginEmail}).subscribe((res:any)=>{
        if(res.n>0){
          Swal.fire('Deleted!', 'Account has been deleted.', 'success');
          this.getSubAccounts()
          // this.dialog.close({dialogResult:{success:true,message:"User deleted"}})
        }
        else{
          this.toastr.error("Error deleting user account")
        }
      })
 
    }
  })
}

  CreateSubAccount(){
    var dialogRef = this.dialog.open(AddSubaccountComponent,{height:"60%",width:"50%"})
    dialogRef.afterClosed().subscribe(res=>{
      if(res.dialogResult.success==true) this.toastr.success(res.dialogResult.message)
      else if(res.dialogResult.success==false) this.toastr.error(res.dialogResult.message)
      this.getSubAccounts()
    })
  }

  navClicked(event){
    console.log(event)
    this.selectedNav=event.index
    if(event.index==1){
      this.tabType='password'
    }
    else if(event.index==2){
      this.tabType='subAccount'
      this.getSubAccounts()
    } 
  }

}
