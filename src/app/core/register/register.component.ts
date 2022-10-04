import { Router, ActivatedRoute } from '@angular/router';
import { UserdataService } from '../../services/userdata.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    userEmail:new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]),
    userName:new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z0-9]+$")]),
    userPassword:new FormControl('',[Validators.required])
  })
  //verification code working
  verificationScreen:boolean=false;
  verificationCode:String="";
  verificationBtn:boolean=true
  verificationResp={
    isReceived:false,
    status:'',
    message:''
  }
  isAlreadyRegistered:boolean=false
  initialTime=120;
  remainingTime=0;
  loadingIndicator:boolean=false
  token:String;
  // set the currenr year
  year: number = new Date().getFullYear();
  constructor(private users:UserdataService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    document.body.removeAttribute('data-layout'); 
    this.token = this.route.snapshot.queryParamMap.get("token")
    if(this.token) this.verifyUser();
  }

  register(){
    debugger
    var user = this.registerForm.value
    console.log(user)
    this.isAlreadyRegistered=false
    if(this.registerForm.status=='VALID'){
      this.users.postDataWithoutHeaders('/signup',user).subscribe((res:any)=>{
        if(!res.hasOwnProperty("error")){
          this.verificationScreen=true
        }else{
          this.isAlreadyRegistered=true
        }
      })
    }
  }

  verifyUser(){
    this.verificationScreen=true;
    console.log(this.registerForm.value)
    console.log(this.verificationCode)
    this.users.updateDataWithoutHeaders("/verifyEmail","",{token:this.token}).subscribe((res:any)=>{
      console.log(res)
      this.verificationResp.isReceived=true;
      this.verificationResp.message=res.message;
      this.verificationResp.status=res.status;
      if(res.status=="success"){
        setTimeout(()=>{
          this.router.navigateByUrl('/login')
        },4000)
      }else if(res.status=="error"){

      }
    })
  }

  resendCode(){
    this.register()
    this.remainingTime=this.initialTime
    setInterval(() => {
      if(this.remainingTime > 0) {
        this.remainingTime--;
      }
    },1000)
  }



}
