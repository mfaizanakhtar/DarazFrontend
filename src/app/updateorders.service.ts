import { HttpClient } from '@angular/common/http';
import { DzapiService } from './dzapi.service';
import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UpdateordersService {
  // private orders:any
  // userID="techatronixs@gmail.com"
  // secretkey="QPqyUdETDVgFfZp41L1WB1j_4Sh7YdV9UdYHG4b74i5NcN-25hgPHvwa"
  constructor(private dapi:DzapiService,private http:HttpClient) { }

  //  postData(){
  //   this.dapi.getOrders(this.userID,this.secretkey,0)
  //   .subscribe(response=>{
  //     this.orders=response;
  //     this.orders=this.orders.SuccessResponse.Body.Orders;
  //     console.log(this.orders);
  //   })
  //   if(this.orders){
  //     this.orders.forEach(order => {
        
  //       this.http.post('http://localhost:3000/api/orders',{
  //       orderid:order.OrderId,
  //       createDate:order.CreatedAt,
  //       status:order.Statuses
  //     }).subscribe(async response=>{
  //       await console.log(response)
  //     });
  //     console.log("adding to db now");
        
  //     })
  //   }
  // }
  

  // refreshData(){
  //   const intervalTime = 1000*10;
    
  //   interval(intervalTime).pipe(switchMap(()=>this.postData().subscribe(()=>{
  //     console.log("service running");
  //   })))
  // }




  
}
