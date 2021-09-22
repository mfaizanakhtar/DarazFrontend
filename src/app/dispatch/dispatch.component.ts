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
  //ngx-table
  ColumnMode=ColumnMode
  loadingIndicator=true
  //audio
  correctAudio:any
  wrongAudio:any
  correctAudioNew:any
  //dispatchdate
  date=new Date();
  //filterdate
  filterenddate=new Date()
  filterstartdate=new Date()

  constructor(private order:OrderItemsService,private toastr:ToastrService) {}

  ngOnInit(): void {
    this.dispatchorders();
    this.correctAudioLoad();
    this.wrongAudioLoad();

    this.filterenddate.setHours(0,0,0,0)
    this.filterstartdate.setHours(0,0,0,0)

    console.log(this.filterenddate.toISOString())
    console.log(this.filterstartdate.toISOString())
  }

  dispatch(f){
    this.order.updateData("dispatch",f.value.tracking,{date:this.date.toISOString()}).subscribe(res=>{
      console.log(res);
      var result:any = res;
      if(result.Status=="Dispatched"){
        this.toastr.success('Dispatched');
        // this.correctAudio.play();
        this.correctAudio.load();
        this.correctAudio.play();
        this.UpdateDispatchedArray(result.updatedResult)
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

  DateInput(mode,event){
    if(mode == 'start'){
      this.filterstartdate = event.value
    }
    if(mode == 'end'){
      if(event.value != null){
        this.filterstartdate = event.value
        this.dispatchorders()
      }
    }
  }

  dispatchorders(){
    this.order.get("ordermovement/Dispatched?startdate="+this.filterstartdate.toISOString()+"&enddate="+this.filterenddate.toISOString()).subscribe(res=>{
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
  correctAudioNewLoad(){
    this.correctAudioNew = new Audio();
    this.correctAudioNew.src ="../../../assets/sounds/Correct.mp3"

  }

  wrongAudioLoad(){
    this.wrongAudio = new Audio();
    this.wrongAudio.src="../../../assets/sounds/Wrong.mp3"
    this.wrongAudio.load();
  }

  UpdateDispatchedArray(dispatchTracking) {
    this.dispatchorderarray = [{_id:dispatchTracking.TrackingCode,Date:dispatchTracking.DispatchDate,OrderId:dispatchTracking.OrderId,ShopId:dispatchTracking.ShopId},...this.dispatchorderarray]
  }

}
