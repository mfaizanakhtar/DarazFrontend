import { AuthService } from 'src/app/services/auth.service';
import { PlansService } from './../../services/plans.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserdataService } from 'src/app/services/userdata.service';
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
  btnText='Get Started'
  isUpgrade:boolean;

  constructor(private user:UserdataService,private router:Router,private plans:PlansService,private auth:AuthService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Home' }, { label: 'Dashboard', active: true }];

    this._fetchData();
    this.fetchUserSubscription();
    this.getAllSubsciprtion();
    this.getQueryParams();
    if(this.isUpgrade) this.btnText='Select'
  }

  private _fetchData() {
    this.pricingData = pricingData;
  }

  selectSubscription(subscription){
    this.plans.selectedPlan=subscription;
    console.log(subscription)
    this.plans.isRenewal=false
    if(this.isUpgrade) this.router.navigate(['/billing'],{queryParams:{isUpgrade:true}});
    else this.router.navigate(['/billing']);
  }

  fetchUserSubscription(){
    this.selectedSubscription=this.auth.getSubscriptionDetail()
    console.log(this.selectedSubscription)
  }

  getAllSubsciprtion(){
    this.plans.get('/getAllPlans').subscribe(res=>{
      this.allSubscriptions = res;
      console.log(this.allSubscriptions)
    })
  }
  getQueryParams(){
    this.isUpgrade = this.route.snapshot.queryParamMap.get('isUpgrade')=='true' ? true : false;
  }

}
