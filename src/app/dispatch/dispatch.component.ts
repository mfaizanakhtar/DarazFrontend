import { Component, OnInit } from '@angular/core';
import { OrderItemsService } from '../services/orderItems.service';
import { ToastrService } from 'ngx-toastr';
import { ColumnMode } from '@swimlane/ngx-datatable';

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
  ColumnMode=ColumnMode
  loadingIndicator=true
  correctAudio:any
  wrongAudio:any
  date=new Date();
  startdate=new Date()

  constructor(private order:OrderItemsService,private toastr:ToastrService) {}

  ngOnInit(): void {
    this.dispatchorders();
    this.correctAudioLoad();
    this.wrongAudioLoad();
    this.startdate.setHours(0,0,0,0);
  }

  dispatch(f){
    this.order.updateData("dispatch",f.value.tracking,{date:this.date.toISOString()}).subscribe(res=>{
      console.log(res);
      var result:any = res;
      if(result[0].Status=="Dispatched"){
        this.toastr.success('Dispatched');
        this.correctAudio.play();
        this.UpdateDispatchedArray(result[1])
      } 
      else if(result.Status=="Duplicate"){
        this.toastr.error('Duplicate Order');
        this.wrongAudio.play();
      }
      else if(result.Status=="Order status not eligible to dispatch"){
        this.toastr.error('Order Status Not Eligbile To Dispatch');
        this.wrongAudio.play();
      }
      else if(result.Status=="Order not Found"){
        this.toastr.error('Order not Found');
        this.wrongAudio.play();
      }
      
    })
    f.reset();
    
    
    
    
    // console.log(value.txtTracking);
  }

  dispatchorders(){
    this.order.get("ordermovement/Dispatched?date="+this.startdate.toISOString()).subscribe(res=>{
      console.log(res);
      this.dispatchorderarray = res;
      this.loadingIndicator=false;
    })
  }

  correctAudioLoad(){
    this.correctAudio = new Audio();
    this.correctAudio.src="../../../assets/sounds/Correct.mp3"
    this.correctAudio.load();
  }

  wrongAudioLoad(){
    this.wrongAudio = new Audio();
    this.wrongAudio.src="../../../assets/sounds/Wrong.mp3"
    this.wrongAudio.load();
  }

  UpdateDispatchedArray(dispatchTracking) {
    this.dispatchorderarray = [...this.dispatchorderarray,{_id:dispatchTracking.TrackingCode,Date:dispatchTracking.ReturnDate,OrderId:dispatchTracking.OrderId,ShopId:dispatchTracking.ShopId}]
  }

}
