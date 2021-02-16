import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css',
"../../assets/bootstrap/css/bootstrap.min.css",
"../../assets/fonts/font-awesome.min.css",
"../../assets/css/Dark-NavBar.css"]
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
