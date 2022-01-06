import { PlansService } from './../../services/plans.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UseremailService } from 'src/app/services/useremail.service';
import Swal from 'sweetalert2';

import { pricingData } from './data';

@Component({
  selector: 'app-subscription-pricing',
  templateUrl: './subscription-pricing.component.html',
  styleUrls: ['./subscription-pricing.component.scss']
})
export class SubscriptionPricingComponent implements OnInit {

  breadCrumbItems: Array<{}>;

  pricingData: any[];

  selectedSubscription:any

  allSubscriptions:any

  constructor(private user:UseremailService,private router:Router,private plans:PlansService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Home' }, { label: 'Dashboard', active: true }];

    this._fetchData();
    this.fetchUserSubscription();
    this.getAllSubsciprtion();
  }

  private _fetchData() {
    this.pricingData = pricingData;
  }

  selectSubscription(subscription){
    this.router.navigate(['/billing',subscription]);
  }

  fetchUserSubscription(){
    this.user.get("/currentSubscription").subscribe((res:any)=>{
       this.selectedSubscription = res.subscriptionType
    })
  }

  getAllSubsciprtion(){
    this.plans.get('/getAllPlans').subscribe(res=>{
      this.allSubscriptions = res;
      console.log(this.allSubscriptions)
    })
  }

}
