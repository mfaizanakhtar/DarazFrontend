import { BillingService } from './../../services/billing.service';
import { bankDetailType } from './bill-payment.model';
import { LookupService } from './../../services/lookup.service';
import { PlansService } from './../../services/plans.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bill-payment',
  templateUrl: './bill-payment.component.html',
  styleUrls: ['./bill-payment.component.scss']
})
export class BillPaymentComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  subscriptionType:any;
  userEmail:String;
  subscriptionMonths:number=1
  bankDetail:bankDetailType;
  transactionId:any

  constructor(private route:ActivatedRoute,private auth:AuthService,private plan:PlansService,private lookup:LookupService,private billing:BillingService,private router:Router) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Billing' }, { label: 'Bill Payment', active: true }];
    this.getData();
    this.lookup.getLookupDetail("bankDetails").subscribe(res=>this.bankDetail = res)
  }

  getData(){
    debugger
    this.userEmail = this.auth.getCurrentUser().useremail;

    this.subscriptionType = this.plan.selectedPlan
    if(!this.subscriptionType){
      this.router.navigate([''])
    }
  }

  submitBilling(){
    this.billing.postDataByCap('/addTransaction',{
      subscriptionType:this.subscriptionType.Name,
      duration:this.subscriptionMonths,
      durationType:'Months',
      pricing:this.subscriptionType.Pricing,
      invoiceAmount:this.subscriptionMonths*this.subscriptionType.Pricing,
      bankDetail:this.bankDetail,
      transactionId:this.transactionId
    }).subscribe((res:any)=>{
      Swal.fire({
        title: 'Billing Request Success',
        text: 'Your Billing Id is #'+res.billingId,
        icon: 'success',
        confirmButtonColor: '#34c38f',
        confirmButtonText: 'Ok'
      }).then(res=>{
        this.router.navigate(['/billing/details'])
      })
    })
  }



}
