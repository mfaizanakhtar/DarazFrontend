import { pageNavRenewals } from './../pageNav';
import { ViewScreenshotComponent } from './../view-screenshot/view-screenshot.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { BillingService } from './../../services/billing.service';
import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { pageNavHistory } from '../pageNav';

@Component({
  selector: 'app-billing-history',
  templateUrl: './billing-history.component.html',
  styleUrls: ['./billing-history.component.scss']
})
export class BillingHistoryComponent implements OnInit {
  //pagination
  length:any
  pIndex=0
  pSize=10
  //tableVariables
  sortedData=[];
  searchTerm:any;
  //billingData
  billingData=[]

  breadCrumbItems: Array<{}>;
  //loading Indicator
  loadingIndicator = true;
  loadingIndicatorValue=0
  user:any
  //pageNavBar
  pageNav;
  selectedPageNav=1
  subscriptionDetails;

  constructor(private billing:BillingService,private auth:AuthService,private router:Router,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Billing' }, { label: 'Details', active: true },];
    this.billing.get('/getAllTransactions').subscribe((res:any)=>{this.sortedData = this.billingData = res;console.log(this.sortedData)})
    this.user = this.auth.getCurrentUser()
    this.subscriptionDetails = this.auth.getSubscriptionDetail();
    this.pageNav=this.subscriptionDetails.subscriptionType=='trial_permissions' ? [pageNavHistory] : [pageNavHistory,pageNavRenewals]
  }

  updateTransaction(status,transactionObj){
    var confirmText;
    status=='approved' ? confirmText="approve" : confirmText="reject"
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#ff3d60',
      confirmButtonText: 'Yes, '+confirmText+' it!'
    }).then(result => {
      if (result.value) {
        this.billing.updateData('/confirmTransaction',"",{status:status,transactionId:transactionObj._id}).subscribe((res:any)=>{
          if(res.status=='updated'){
            Swal.fire(status.toUpperCase()+'!', 'Transaction has been '+status, 'success').then(result=>{
              this.billing.get('/getAllTransactions').subscribe((res:any)=>{this.sortedData = this.billingData = res;console.log(this.sortedData)})
            });
          }else{
            Swal.fire({
            title:'Internal Error',
            icon:'error',
            confirmButtonColor: '#34c38f',
            cancelButtonColor: '#ff3d60',
            confirmButtonText: 'Ok'})
          }

        })
        
      }
    });
  }


  sortData(sort: Sort) {
    var data = this.billingData.slice()
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'status':
          return this.compare(a.status, b.status, isAsc);
        case 'billingId':
          return this.compare(a.billingId, b.billingId, isAsc);
        case 'createdAt':
          return this.compare(a.createdAt, b.createdAt, isAsc);
        case 'userEmail':
          return this.compare(a.userEmail, b.userEmail, isAsc);
        case 'subscriptionType':
          return this.compare(a.subscriptionType, b.subscriptionType, isAsc);
        case 'duration':
          return this.compare(a.duration, b.duration, isAsc);
        case 'pricing':
          return this.compare(a.pricing, b.pricing, isAsc);
        case 'transactionId':
          return this.compare(a.transactionId, b.transactionId, isAsc);
        case 'status':
          return this.compare(a.status, b.status, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  changePageSize(){

  }

  changePage(event){

  }

  navClick(tab){
    this.router.navigate([tab.link])
  }

  viewScreenshot(screenShot){
    this.dialog.open(ViewScreenshotComponent,{data:{screenShot:screenShot}})
  }



}
