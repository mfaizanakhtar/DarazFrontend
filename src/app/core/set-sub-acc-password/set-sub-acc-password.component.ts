import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserdataService } from 'src/app/services/userdata.service';

@Component({
  selector: 'app-set-sub-acc-password',
  templateUrl: './set-sub-acc-password.component.html',
  styleUrls: ['./set-sub-acc-password.component.scss']
})
export class SetSubAccPasswordComponent implements OnInit {
  loadingIndicator=false;
  //subAccount working
  isSubAccountInvite:boolean=true;
  errorMsg='Incorrect or Expired Invite Link'
  successMsg;
  isError:boolean=false
  isSuccess:boolean=false
  subAccountInviteToken:String;
  subAccountUser:any;

  registerForm = new FormGroup({
    loginEmail:new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]),
    userName:new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z0-9]+")]),
    userPassword:new FormControl('',[Validators.required])
  })

  constructor(private route:ActivatedRoute,private users:UserdataService,private router:Router) { }

  ngOnInit(): void {
    this.subAccountAction()
    console.log(this.registerForm)
  }

  completeRegisteration(){
    console.log(this.registerForm)
    if(this.registerForm.status=='VALID'){
      this.isError=false
      this.users.postDataWithoutHeaders('/verifySubAccountWithToken/'+this.subAccountInviteToken,this.registerForm.value).subscribe((res:any)=>{
        if(res.status=='success'){
          this.isSuccess=true
          this.successMsg=res.message
          setTimeout(()=>{
            this.router.navigateByUrl('/login')
          },4000)
        }else if(res.status=='error'){
          this.isError=true
          this.errorMsg=res.message
        }
      })
    }else if(this.registerForm.status=='INVALID'){
      this.errorMsg='Password Can Not Be Empty'
      this.isError=true
    }

  }

  subAccountAction(){
    debugger
    this.subAccountInviteToken = this.route.snapshot.queryParamMap.get("token")
    if(this.subAccountInviteToken){
      this.users.getWithoutHeaders('/getSubAccountWithToken/'+this.subAccountInviteToken).subscribe((res:any)=>{
        debugger
        if(res.status=='success'){
          this.subAccountUser = res.user
          console.log(this.subAccountUser)
          this.registerForm.patchValue({
            loginEmail:this.subAccountUser.loginemail,
            userName:this.subAccountUser.username
          })
          
        }else this.isSubAccountInvite=false
      })
    }else this.isSubAccountInvite=false
  }

}
