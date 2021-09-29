import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  result:any
  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  signin(credentials){
    this.auth.login(credentials).subscribe(res=>{
      if(res){
        this.router.navigate([''])
      }
    })
    
    
  }

}
