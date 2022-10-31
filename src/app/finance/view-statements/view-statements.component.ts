import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service';

@Component({
  selector: 'app-view-statements',
  templateUrl: './view-statements.component.html',
  styleUrls: ['./view-statements.component.scss']
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
    "ShippingFeeCustomer":{Amount:0,Vat:0},
    "PaymentFee":{Amount:0,Vat:0},
    "ReversalItemPrice":{Amount:0,Vat:0},
    "ReversalComission":{Amount:0,Vat:0},
    "OtherDebits":{Amount:0,Vat:0},
    "AdjustmentsOthers":{Amount:0,Vat:0},
    "ShippingFeeDiscount":{Amount:0,Vat:0}
  }
  breadCrumbItems: Array<{}>;
  constructor(private transaction:TransactionsService) { }

  ngOnInit(): void {
    this.getFilters()
    this.breadCrumbItems = [{ label: 'Home' }, { label: 'Statements', active: true },];
  }

  getFilters(){
    this.transaction.get('/ViewStatementFilters').subscribe((res:any)=>{
      console.log(res)
      this.StatementArray=res.Statements
      this.StoreArray=res.Stores
      this.Statement= this.StatementArray.length>0 ? this.StatementArray[0]._id : []
      this.getStatements()
    })
  }

  getStatements(){
    this.StatementObj={
      "ItemPriceCredit":{Amount:0,Vat:0},
      "Comission":{Amount:0,Vat:0},
      "AutomaticShippingFee":{Amount:0,Vat:0},
      "ShippingFeeCustomer":{Amount:0,Vat:0},
      "PaymentFee":{Amount:0,Vat:0},
      "ReversalItemPrice":{Amount:0,Vat:0},
      "ReversalComission":{Amount:0,Vat:0},
      "OtherDebits":{Amount:0,Vat:0},
      "AdjustmentsOthers":{Amount:0,Vat:0},
      "ShippingFeeDiscount":{Amount:0,Vat:0}
    }

    var tempStatement
    var tempShop
    if(this.Statement=="All"){tempStatement=null}else{tempStatement=this.Statement}
    if(this.Shop=="All"){tempShop=null}else{tempShop=this.Shop}

    this.transaction.get('/Statement?Statement='+tempStatement+"&ShopShortCode="+tempShop).subscribe(res=>{
      var response:any = res

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
    if(s._id=="Product Price Paid by Buyer") {
      this.StatementObj.ItemPriceCredit.Amount=s.Amount
      this.StatementObj.ItemPriceCredit.Vat=s.Vat
    }
    if(s._id=="Commission Fee") {
      this.StatementObj.Comission.Amount=s.Amount
      this.StatementObj.Comission.Vat=s.Vat
    }
    if(s._id=="Shipping Fee Paid by Buyer") {
      this.StatementObj.ShippingFeeCustomer.Amount=s.Amount
      this.StatementObj.ShippingFeeCustomer.Vat=s.Vat
    }
    if(s._id=="Shipping Fee") {
      this.StatementObj.AutomaticShippingFee.Amount=s.Amount
      this.StatementObj.AutomaticShippingFee.Vat=s.Vat
    }
    if(s._id=="Payment Fee") {
      this.StatementObj.PaymentFee.Amount=s.Amount
      this.StatementObj.PaymentFee.Vat=s.Vat
    }
    if(s._id=="Reversal Item Price"){
      this.StatementObj.ReversalItemPrice.Amount=s.Amount
      this.StatementObj.ReversalItemPrice.Vat=s.Vat
    }
    if(s._id=="Reversal Commission"){
      this.StatementObj.ReversalComission.Amount=s.Amount
      this.StatementObj.ReversalComission.Vat=s.Vat
    }
    if(s._id=="Other Debits (Returns)"){
      this.StatementObj.OtherDebits.Amount=s.Amount
      this.StatementObj.OtherDebits.Vat=s.Vat
    }
    if(s._id=="Adjustments Others"){
      this.StatementObj.AdjustmentsOthers.Amount=s.Amount
      this.StatementObj.AdjustmentsOthers.Vat=s.Vat
    }
    if(s._id=="Shipping Fee Discount"){
      this.StatementObj.ShippingFeeDiscount.Amount=s.Amount
      this.StatementObj.ShippingFeeDiscount.Vat=s.Vat
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
