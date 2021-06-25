import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { ToastrService } from 'ngx-toastr';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-returntracking',
  templateUrl: './returntracking.component.html',
  styleUrls: ['./returntracking.component.css',
  "../../assets/table/vendor/bootstrap/css/bootstrap.min.css",
  "../../assets/table/fonts/font-awesome-4.7.0/css/font-awesome.min.css",
  "../../assets/table/vendor/animate/animate.css",
  "../../assets/table/vendor/select2/select2.min.css",
  "../../assets/table/vendor/perfect-scrollbar/perfect-scrollbar.css",
  "../../assets/table/css/util.css",
  "../../assets/table/css/main.css"]
})
export class ReturntrackingComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;

  returnorderarray:any;
  ColumnMode=ColumnMode;

  constructor(private order:OrdersService,private toastr:ToastrService) { }
  loadingIndicator=false

  
  ngOnInit(): void {
    this.returnorders();
    // this.toastr.success('Dispatched');
  }

  formatDate(date){
    var d = new Date(date);
    var formattedDate=d.toLocaleDateString('en-US',{weekday:'long'})+' '+ d.getDate()+'-'+d.getMonth()+'-'+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes()
    return formattedDate
  }


  insertTracking(f){
    this.order.updateData("return",f.value.tracking,{}).subscribe(response=>{
      console.log(response);
      var result:any = response;
      // this.returnorders();
      if(result[0].Status=="Received"){
        this.toastr.success("Return Received");
        console.log(result[1])
        this.UpdateReturnedArray(result[1])
        this.CorrectAudio();
      } 
      else if(result.Status=="Already Received"){
        this.toastr.error("Return Already Received");
        this.WrongAudio();
      } 
      else if(result.Status=="Tracking not Found"){
        this.toastr.error("Tracking not Found");
        this.WrongAudio();
      } 
    });
    f.reset();
  }

  returnorders(){
    this.order.get("ordermovement/Received").subscribe(res=>{
      console.log(res);
      this.returnorderarray=res;
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

  UpdateReturnedArray(returnedTracking) {
    this.returnorderarray = [...this.returnorderarray,{_id:returnedTracking.TrackingCode,Date:returnedTracking.ReturnDate,OrderId:returnedTracking.OrderId,ShopId:returnedTracking.ShopId}]
  }

}



