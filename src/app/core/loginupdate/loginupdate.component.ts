import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-loginupdate',
  templateUrl: './loginupdate.component.html',
  styleUrls: ['./loginupdate.component.scss']
})
export class LoginupdateComponent implements OnInit {
  error: boolean=false;

  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  signin(credentials){
    this.auth.login(credentials).subscribe(res=>{
      if(res){
        this.router.navigate([''])
      }
      else{
        this.error=true
      }
    })
  }

}
