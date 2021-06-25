import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.css',
  "../../assets/table/vendor/bootstrap/css/bootstrap.min.css",
  "../../assets/table/fonts/font-awesome-4.7.0/css/font-awesome.min.css",
  "../../assets/table/vendor/animate/animate.css",
  "../../assets/table/vendor/select2/select2.min.css",
  "../../assets/table/vendor/perfect-scrollbar/perfect-scrollbar.css",
  "../../assets/table/css/util.css",
  "../../assets/table/css/main.css"]
})
export class DispatchComponent implements OnInit {
  dispatchorderarray:any

  constructor(private order:OrdersService,private toastr:ToastrService) {}

  ngOnInit(): void {
    this.dispatchorders();
  }

  dispatch(f){
    this.order.updateData("dispatch",f.value.txtTracking,{}).subscribe(res=>{
      console.log(res);
      var result:any = res;
      this.dispatchorders();
      if(result.Status=="Dispatched"){
        this.toastr.success('Dispatched');
        this.CorrectAudio();
      } 
      else if(result.Status=="Duplicate"){
        this.toastr.error('Duplicate Order');
        this.WrongAudio();
      }
      else if(result.Status=="Order status not eligible to dispatch"){
        this.toastr.error('Order Status Not Eligbile To Dispatch');
        this.WrongAudio();
      }
      else if(result.Status=="Order not Found"){
        this.toastr.error('Order not Found');
        this.WrongAudio();
      }
      
    })
    f.reset();
    
    
    
    
    // console.log(value.txtTracking);
  }

  dispatchorders(){
    this.order.get("ordermovement/Dispatched").subscribe(res=>{
      console.log(res);
      this.dispatchorderarray = res;
    })
  }

  CorrectAudio(){
    let audio = new Audio();
    audio.src="../../../assets/sounds/Correct.mp3"
    audio.load();
    audio.play();
  }

  WrongAudio(){
    let audio = new Audio();
    audio.src="../../../assets/sounds/Wrong.mp3"
    audio.load();
    audio.play();
  }

}
