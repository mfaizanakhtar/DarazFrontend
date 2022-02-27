import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error: boolean=false;

  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  signin(credentials){
    this.auth.login(credentials).subscribe(res=>{
      if(res){
        this.auth.setSubscriptionDetails().subscribe(res=>{
          this.router.navigate([''])
        })
      }
      else{
        this.error=true
      }
    })
  }

}
