import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  User
  constructor(public auth:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.User = this.auth.getCurrentUser()
    console.log(this.User)
  }

  logout(){
    this.auth.logout()
    console.log("button click")
    this.router.navigate(['login'])
  }

}
