import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UseremailService } from '../services/useremail.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private toastr:ToastrService,private user:UseremailService) { }

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

}
