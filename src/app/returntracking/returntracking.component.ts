import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderItemsService } from '../services/orderItems.service';
import { ToastrService } from 'ngx-toastr';
import { ColumnMode, DatatableComponent,SelectionType } from '@swimlane/ngx-datatable';
import { MatDialog } from '@angular/material/dialog';
import { AddReturnedStockComponent } from '../add-returned-stock/add-returned-stock.component';

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
  //ngx-table
  ColumnMode=ColumnMode;
  SelectionType = SelectionType;
  selected=[];
  selLength=false
  //Audio
  wrongAudio:any
  correctAudio:any
  //returndate
  date=new Date();
  //filterdate
  filterenddate=new Date()
  filterstartdate=new Date()

  constructor(private order:OrderItemsService,private toastr:ToastrService,private dialog:MatDialog) { }
  loadingIndicator=true

  
  ngOnInit(): void {
    this.returnorders();
    this.correctAudioLoad()
    this.wrongAudioLoad()

    this.filterenddate.setHours(0,0,0,0)
    this.filterstartdate.setHours(0,0,0,0)

    console.log(this.filterenddate.toISOString())
    console.log(this.filterstartdate.toISOString())
  }


  insertTracking(f){
    this.order.updateData("return",f.value.tracking,{date:this.date.toISOString()}).subscribe(response=>{
      console.log(response);
      var result:any = response;

      if(result.Status=="Received"){
        this.toastr.success("Return Received");
        console.log(result.updatedResult)
        this.UpdateReturnedArray(result.updatedResult)
        this.correctAudio.play()
      } 
      else if(result.Status=="Already Received"){
        this.toastr.error("Return Already Received");
        this.wrongAudio.play()
      } 
      else if(result.Status=="Tracking not Found"){
        this.toastr.error("Tracking not Found");
        this.wrongAudio.play();
      } 
    });
    f.reset();
  }

  DateInput(mode,event){
    if(mode == 'start'){
      this.filterstartdate = event.value
    }
    if(mode == 'end'){
      if(event.value != null){
        this.filterstartdate = event.value
        this.returnorders()
      }
    }
  }

  returnorders(){
    this.order.get("ordermovement/Received?startdate="+this.filterstartdate.toISOString()+"&enddate="+this.filterenddate).subscribe(res=>{
      console.log(res);
      this.returnorderarray=res;
      this.loadingIndicator=false;
    })
  }

  AddReturnStock(){
    var dialogRef=this.dialog.open(AddReturnedStockComponent,{data:this.selected,width:'50%'})
    dialogRef.afterClosed().subscribe(res=>{
      this.toastr.success("Successfully added back to stock")
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

  UpdateReturnedArray(returnedTracking) {
    this.returnorderarray = [{_id:returnedTracking.TrackingCode,Date:returnedTracking.ReturnDate,OrderId:returnedTracking.OrderId,ShopId:returnedTracking.ShopId},...this.returnorderarray]
  }

  onSelect({ selected }) {

    this.selected.splice(0, this.selected.length);
    for(const sel of selected){
      this.selected.push(sel);
    }
    if(this.selected.length>0){
      this.selLength=true
    }
    else if(this.selected.length==0){
      this.selLength=false
    }
  }

}



