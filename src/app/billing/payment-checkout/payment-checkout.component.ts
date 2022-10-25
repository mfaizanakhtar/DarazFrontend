import { BillingService } from './../../services/billing.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CouponService } from 'src/app/services/coupon.service';
import { PlansService } from 'src/app/services/plans.service';

@Component({
  selector: 'app-payment-checkout',
  templateUrl: './payment-checkout.component.html',
  styleUrls: ['./payment-checkout.component.scss']
})
export class PaymentCheckoutComponent implements OnInit {

  userEmail:String;
  subscriptionMonths:number=12
  subscriptionType:any;
  payWith:number=1;
  haveCoupon:Boolean=false;
  couponLoading:Boolean=false;
  couponApplied=false;
  couponValue:number=0;
  subTotal:number=0;
  couponErrorMsg:String;
  isUpgrade:Boolean=false;
  isFutureRequest:Boolean=false;
  currentSubscription:any;
  btnSubmitClick:Boolean=false;
  couponInput = new FormControl('', [Validators.required]);

  constructor(private auth:AuthService,private plan:PlansService,private coupon:CouponService,private router:Router,private route:ActivatedRoute,private billing:BillingService) { }

  ngOnInit(): void {
    this.getData();
    this.isUpgrade = this.route.snapshot.queryParamMap.get("isUpgrade")=='true' ? true : false;
    if(this.plan.durationSelected!=null) this.subscriptionMonths = Number(this.plan.durationSelected);
    if(this.isUpgrade) this.currentSubscription = this.auth.getSubscriptionDetail()
  }

  getData(){
    this.userEmail = this.auth.getCurrentUser().userEmail;
    debugger;
    this.subscriptionType = this.plan.selectedPlan
    if(!this.subscriptionType){
      this.router.navigate([''])
    }
    this.setSubtotal()
    
  }

  toggleCoupon(){
    this.haveCoupon=!this.haveCoupon;
  }

  getErrorMessage(){
    if(this.couponInput.value==''){
      return 'Coupon can not be empty';
    }else{
      return this.couponErrorMsg
    }
  }

  applyCoupon(){
    this.coupon.get('/applyCoupon?couponCode='+this.couponInput.value.toUpperCase()+"&totalAmount="+this.subTotal).subscribe((res:any)=>{
      if(res.couponValue){
        this.couponSuccess(res.couponValue);
      }else{
        this.couponInput.setErrors({'incorrect':true})
        this.couponErrorMsg=res.message;
      }
    })
  }

  couponSuccess(couponvalue){
    this.couponValue=couponvalue;

    this.couponLoading=true
    this.couponApplied=true;
    this.couponLoading=false;
  }

  removeCoupon(){
    this.haveCoupon=false;
    this.couponLoading=false;
    this.couponApplied=false;
    this.couponValue=0;
  }

  clickPayNow(){
    this.btnSubmitClick=true
    debugger

    this.billing.postDataByCap('/addTransaction',{
      subscriptionType:this.subscriptionType.Name,
      durationType:'Months',
      duration:this.subscriptionMonths,
      pricing:this.subscriptionType.Pricing,
      billingMethod:this.payWith,
      isFutureRequest:this.isFutureRequest,
      invoiceAmount:this.getInvoiceAmount(),
    }).subscribe((res:any)=>{
      this.btnSubmitClick=false;
      this.plan.billingAmount=this.getInvoiceAmount();
      this.plan.billingId=res.billingId;
      if(res.redirectUrl.includes(".")){
        window.location.href=res.redirectUrl;
      }else{
        this.router.navigate([res.redirectUrl])
      }
    })
  }

  setSubtotal(){
    this.subTotal = this.subscriptionType.Pricing*this.subscriptionMonths*(this.subscriptionType.DiscountPercent[this.subscriptionMonths])
  }

  getInvoiceAmount(){
    return this.subTotal-this.couponValue;
  }




}
