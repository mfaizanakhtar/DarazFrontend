import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../services/transactions.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-view-transactions',
  templateUrl: './view-transactions.component.html',
  styleUrls: ['./view-transactions.component.css']
})
export class ViewTransactionsComponent implements OnInit {
  Transactions:any
  //date
  enddate:Date
  startdate:Date
  todayDate=new Date();
  backDate=new Date();
  //Transaction Filter
  transactionTypeArray=[]
  FeeNameArray=[]
  StoreArray=[]
  StatementArray=[]
  transactionType='All'
  FeeName='All'
  Store='All'
  OrderId=null
  Statement='All'
  Balance
  //paginator
  pIndex=0
  pSize=10
  pageLength
  //loader
  LoadingIndicator=false
  

  constructor(private transaction:TransactionsService) { }

  ngOnInit(): void {

    this.backDate.setDate(this.backDate.getDate()-15)
    this.todayDate.setHours(0,0,0,0);
    this.backDate.setHours(0,0,0,0);
    this.enddate=this.todayDate
    this.startdate=this.backDate 

    this.getTransactions()
  }

  changePageData(event?:PageEvent){
    this.pSize=event.pageSize;
    this.pIndex=event.pageIndex
    this.getTransactions()
  }

  getTransactions(){
    this.LoadingIndicator=true

    var tempTransType,tempFeename,tempStore,tempStatement
    if(this.transactionType=='All'){tempTransType=null}else{tempTransType=this.transactionType}
    if(this.FeeName=='All'){tempFeename=null}else{tempFeename=this.FeeName}
    if(this.Store=='All'){tempStore=null}else{tempStore=this.Store}
    if(this.Statement=='All'){tempStatement=null}else{tempStatement=this.Statement}

    this.transaction.get('/'+'?pSize='+this.pSize+'&pIndex='+this.pIndex+'&startDate='+this.startdate+'&endDate='+this.enddate
    +'&TransactionType='+tempTransType+'&FeeName='+tempFeename+'&ShopId='+tempStore+'&OrderNo='+this.OrderId
    +'&Statement='+tempStatement).subscribe(res=>{

      var response:any = res
      this.Transactions = response.Transactions
      this.transactionTypeArray=response.TransactionType
      this.FeeNameArray=response.FeeName
      this.pageLength=response.Length
      this.StoreArray=response.Stores
      this.StatementArray=response.Statements
      this.Balance=response.TotalBalance[0].Sum

      this.LoadingIndicator=false

      console.log(res)
    })
  }

  DateInput(mode,event){
    if(mode == 'start'){
      this.startdate = event.value
    }
    if(mode == 'end'){
      if(event.value != null){
        this.enddate = event.value
        this.pSize=10
        this.pIndex=0
        this.getTransactions()
      }
    }
    

  }

  FeeSelected(event){
    this.getTransactions()
  }

  transactionSelected(event){
    this.FeeName='All'
    this.getTransactions()
  }

  StoreSelected(event){

  }

  statementSelected(event){
    this.getTransactions()
  }

  findOrder(f){
    // console.log(f.value)
    this.OrderId=f.value.OrderId

    if(this.OrderId=="") this.OrderId=null

    this.getTransactions()
  }

}
