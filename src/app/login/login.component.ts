import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  result:any
  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  signin(value){
    this.auth.login(value)
    .subscribe(response=>{
      this.result = response;
    })
    console.log(this.result)
    if(this.result){
      this.router.navigate(['/dashboard'])
    }
    
    
  }

}
