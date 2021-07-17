import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.auth.getCurrentUser()
  }

  logout(){
    this.auth.logout()
    console.log("button click")
    this.router.navigate(['login'])
  }

  isAdmin(){
    if(this.auth.getCurrentUser().usertype=='admin'){
      return true
    }
  }

}
