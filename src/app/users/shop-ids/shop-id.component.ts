import { Routes, ActivatedRoute, Router } from '@angular/router';
import { LookupService } from './../../services/lookup.service';
import { ShopService } from '../../services/shop.service';
import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shop-id',
  templateUrl: './shop-id.component.html',
  styleUrls: ['./shop-id.component.scss']
})
export class ShopIdComponent implements OnInit {

  constructor(private shopService:ShopService,private lookup:LookupService,private route:ActivatedRoute,private router:Router) { }
  darazIds:any
  ColumnMode=ColumnMode
  loadingIndicator=false;
  spinnerLoadingIndicator=false;
  openAppDetails:any;
  breadCrumbItems: Array<{}>;

  ngOnInit(): void {
    this.getIds()
    this.breadCrumbItems = [{ label: 'Home' }, { label: 'Shops', active: true },];
    this.route.queryParams.subscribe(res=>{
      if(res.code){
        this.handleCallBackCode(res.code)
      }
    })
  }

  getIds(){
    this.loadingIndicator=true;
    this.shopService.get("/getAll").subscribe(res=>{
      this.darazIds=res
      this.loadingIndicator=false;
      console.log(this.darazIds)
    })
  }

  onActivate(event){
    // if(event.type=="click"){
    //   this.clickId(event.row)
    // }
  }

  deleteShop(row){

    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#ff3d60',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
      this.shopService.deleteDataByCap("delete",row.shortCode).subscribe((deleteRes:any)=>{
        if(deleteRes.nModified==1){
        Swal.fire('Deleted!', 'Your Shop has been deleted.', 'success');
        this.getIds()
        }
      })
    }

    });
    

  }

  integrateNewShop(){
    var url;
    this.lookup.getLookupDetail("darazOpenAppDetails").subscribe(res=>{
      this.openAppDetails=res;
      url=this.openAppDetails.pkUrl+"?response_type=code"+"&force_auth=true"+"&redirect_uri="+this.openAppDetails.callBackUrl+"&client_id="+this.openAppDetails.appKey
      window.location.href=url;
    })
  }

  handleCallBackCode(code){
    this.spinnerLoadingIndicator=true
    debugger
    this.shopService.get('/authorise?code='+code).subscribe((res:any)=>{
      this.spinnerLoadingIndicator=false;
      var successTitle="Shop integrated successfully";
      var successText="your shop " + res.shopName + " has been linked!";
      if(res.isUpdated){
        successTitle="Shop updated successfully";
        successText="your shop " + res.shopName + " was already linked and is now updated!";
      }

      Swal.fire({
        title: successTitle,
        text: successText,
        icon: 'success',
        confirmButtonColor: '#5438dc',
      }).then(okClicked=>{
        debugger
        window.location.href=this.router.url.split('?')[0] ;
      });
    },({error:err})=>{
      this.spinnerLoadingIndicator=false;
      Swal.fire({
        title: "Error occured",
        text: err.message,
        icon: 'error',
        confirmButtonColor: '#5438dc',
      }).then(okClicked=>{
        debugger
        window.location.href=this.router.url.split('?')[0] ;
      });
    })
  }

}
