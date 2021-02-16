import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-returntracking',
  templateUrl: './returntracking.component.html',
  styleUrls: ['./returntracking.component.css']
})
export class ReturntrackingComponent implements OnInit {

  constructor(private order:OrdersService) { }

  ngOnInit(): void {
    
  }

  insertTracking(value){
    this.order.updateData("tracking",value.tracking,{}).subscribe(response=>{
      console.log(response);
    });
    
    // console.log(`inser function working ${value.tracking}`);
  }

}
