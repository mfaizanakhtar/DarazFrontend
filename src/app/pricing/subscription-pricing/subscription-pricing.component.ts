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

  constructor(private user:UseremailService,private router:Router) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Home' }, { label: 'Dashboard', active: true }];

    this._fetchData();
    this.fetchUserSubscription()
  }

  private _fetchData() {
    this.pricingData = pricingData;
  }

  selectSubscription(subscription){
    this.router.navigate(['/billing']);
    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: 'You won\'t be able to revert this!',
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#34c38f',
    //   cancelButtonColor: '#ff3d60',
    //   confirmButtonText: 'Yes, change it!'
    // }).then(result => {
    //   if (result.value) {

    //     this.user.updateData("/selectSubscription","",{subscriptionType:subscription}).subscribe(res=>{
    //       Swal.fire('Subscription Changed!', 'Your subscription has been changed successfully.', 'success');
    //       this.fetchUserSubscription()
    //     })

    //   }
    // });



  }

  fetchUserSubscription(){
    this.user.get("/currentSubscription").subscribe((res:any)=>{
       this.selectedSubscription = res.subscriptionType
    })
  }

}
