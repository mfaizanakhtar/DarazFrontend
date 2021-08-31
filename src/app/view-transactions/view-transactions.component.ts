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
  pIndex=0
  pSize=10

  constructor(private transaction:TransactionsService) { }

  ngOnInit(): void {
    this.getTransactions()
  }

  changePageData(event?:PageEvent){
    this.pSize=event.pageSize;
    this.pIndex=event.pageIndex
    this.getTransactions()
  }

  getTransactions(){
    this.transaction.get('/'+'?pSize='+this.pSize+'&pIndex='+this.pIndex).subscribe(res=>{
      this.Transactions = res
      console.log(res)
    })
  }

}
