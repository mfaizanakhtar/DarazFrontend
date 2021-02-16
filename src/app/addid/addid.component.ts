import { AddidService } from './../addid.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addid',
  templateUrl: './addid.component.html',
  styleUrls: ['./addid.component.css']
})
export class AddidComponent implements OnInit {

  constructor(private addid:AddidService) { }

  ngOnInit(): void {
  
  }

  addids(value){
    this.addid.postData({
      emailid:value.email,
      secretkey:value.secretkey
    })
    .subscribe(response=>{
      console.log(response);
    })
  }

}
