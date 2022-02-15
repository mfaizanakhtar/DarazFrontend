import { AuthService } from './../../services/auth.service';
import { BillingService } from './../../services/billing.service';
import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';

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

  constructor(private billing:BillingService,private auth:AuthService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Billing' }, { label: 'Details', active: true },];
    this.billing.get('/getAllTransactions').subscribe((res:any)=>{this.sortedData = this.billingData = res;console.log(this.sortedData)})
    this.user = this.auth.getCurrentUser()
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



}
