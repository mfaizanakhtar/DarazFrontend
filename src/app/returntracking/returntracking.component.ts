import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { ToastrService } from 'ngx-toastr';

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
  returnorderarray:any;

  constructor(private order:OrdersService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.returnorders();
    // this.toastr.success('Dispatched');
  }

  insertTracking(f){
    this.order.updateData("return",f.value.tracking,{}).subscribe(response=>{
      console.log(response);
      var result:any = response;
      this.returnorders();
      if(result.Status=="Received"){
        this.toastr.success("Return Received");
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
    // console.log(`inser function working ${value.tracking}`);
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

}

