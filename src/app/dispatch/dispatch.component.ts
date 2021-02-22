import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
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

  dispatch(value){
    this.order.updateData("dispatch",value.txtTracking,{}).subscribe(res=>{
      console.log(res);
      var result:any = res;
      this.dispatchorders();
      if(result.Status=="Dispatched"){
        this.toastr.success('Dispatched');
        this.CorrectAudio();
      } 
      else if(result.Status=="Cant Dispatch"){
        this.toastr.error('Already dispatched or Not RTS');
        this.WrongAudio();
      } 
      
    })
    
    
    
    
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
