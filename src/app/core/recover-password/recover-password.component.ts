import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserdataService } from './../../services/userdata.service';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {

  year: number = new Date().getFullYear();
  resetFormGroup = new FormGroup({
    resetEmail:new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')])
  })

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let newPassword = group.get('newPassword').value;
    let reEnterNewPassword = group.get('reEnterNewPassword').value
  
    return newPassword === reEnterNewPassword ? null : { notSame: true }
  }

  changePasswordGroup = new FormGroup({
    newPassword:new FormControl('',[Validators.required]),
    reEnterNewPassword:new FormControl('',[Validators.required])
  },{validators: this.checkPasswords})
  
  isSuccess:boolean=true
  isResetLink:boolean=true;
  resMessage="Enter your Email and instructions will be sent to you!"
  tokenString;
  constructor(private users:UserdataService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    document.body.removeAttribute('data-layout');

    this.route.queryParamMap.subscribe((Map:any)=>{
      if(Map.params.token){
        if(Map.params.token.length>0){
          this.isResetLink=false
          this.tokenString=Map.params.token
          this.resMessage=""
        }
      }
    })

  }



  sendResetPasswordLink(){
    debugger
    if(this.resetFormGroup.status=='VALID'){
      this.users.postDataWithoutHeaders('/recoverPassword',this.resetFormGroup.value).subscribe((res:any)=>{
        this.resMessage=res.message
        if(res.status=='success'){
          this.isSuccess=true
          setTimeout(()=>{
            this.router.navigateByUrl('/login')
          },4000)
        }else if(res.status=='error'){
          this.isSuccess=false
        }
      })
    }
  }

  resetPassword(){
    if(this.changePasswordGroup.status=='VALID'){
      this.users.updateDataWithoutHeaders('resetPasswordWithToken',this.tokenString,{userPassword:this.changePasswordGroup.value.newPassword}).subscribe((res:any)=>{
        this.resMessage=res.message
        if(res.status=='error'){
          this.isSuccess=false
        }else if(res.status=='success'){
          this.isSuccess=true
          setTimeout(()=>{
            this.router.navigate(['login'])
          },4000)
        }
      })
    }
    console.log(this.changePasswordGroup)
    console.log(this.changePasswordGroup.hasError('notSame'))
  }

}
