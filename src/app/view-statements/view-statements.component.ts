import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../services/transactions.service';

@Component({
  selector: 'app-view-statements',
  templateUrl: './view-statements.component.html',
  styleUrls: ['./view-statements.component.css']
})
export class ViewStatementsComponent implements OnInit {
  Statement="All"
  Shop="All"
  StoreArray=[]
  StatementArray=[]
  StatementValArray=[]
  loadingIndicator=true
  StatementObj={
    "ItemPriceCredit":{Amount:0,Vat:0},
    "Comission":{Amount:0,Vat:0},
    "AutomaticShippingFee":{Amount:0,Vat:0},
    "ShippingFeeCustomer":{Amount:0,Vat:0}
  }
  constructor(private transaction:TransactionsService) { }

  ngOnInit(): void {
    this.getStatements()
  }

  getStatements(){
    var tempStatement
    var tempShop
    if(this.Statement=="All"){tempStatement=null}else{tempStatement=this.Statement}
    if(this.Shop=="All"){tempShop=null}else{tempShop=this.Shop}

    this.transaction.get('/Statement?Statement='+tempStatement+"&ShopId="+tempShop).subscribe(res=>{
      var response:any = res

      this.sortAndSetStores(response.DropDown.Store)
      this.sortAndSetStatements(response.DropDown.Statements)
      this.sortAndSetStatementObj(response.Statement)

      console.log(res)
      this.loadingIndicator=false
    })
  }

  statementSelected(event){
    this.getStatements()
  }
  shopSelected(event){
    this.getStatements()
  }

  sortAndSetStatementObj(statement){
    for(var s of statement){
    if(s._id=="Item Price Credit") {
      this.StatementObj.ItemPriceCredit.Amount=s.Amount
      this.StatementObj.ItemPriceCredit.Vat=s.Vat
    }
    if(s._id=="Commission") {
      this.StatementObj.Comission.Amount=s.Amount
      this.StatementObj.Comission.Vat=s.Vat
    }
    if(s._id=="Shipping Fee (Paid By Customer)") {
      this.StatementObj.ShippingFeeCustomer.Amount=s.Amount
      this.StatementObj.ShippingFeeCustomer.Vat=s.Vat
    }
    if(s._id=="Automatic Shipping Fee") {
      this.StatementObj.AutomaticShippingFee.Amount=s.Amount
      this.StatementObj.AutomaticShippingFee.Vat=s.Vat
    }
  }
  }

  sortAndSetStores(stores){
    stores.sort((a,b)=>{
      if(a._id<b._id){
        return -1
      }
      if(a._id>b._id){
        return 1
      }
      return 0
    })
  this.StoreArray=stores
  }

  sortAndSetStatements(statement){
    statement.sort((a,b)=>{
      if(a._id>b._id){
        return -1
      }
      if(a._id<b._id){
        return 1
      }
      return 0
    })
  this.StatementArray=statement
  }
  

}