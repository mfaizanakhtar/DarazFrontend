import { BillingService } from './../../services/billing.service';
import { PlansService } from './../../services/plans.service';
import { LookupService } from './../../services/lookup.service';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { pageNavHistory, pageNavRenewals } from '../pageNav';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-billing-renewal',
  templateUrl: './billing-renewal.component.html',
  styleUrls: ['./billing-renewal.component.scss']
})
export class BillingRenewalComponent implements OnInit {
  breadCrumbItems
    //pageNavBar
  pageNav;
  selectedPageNav=2
  checkBox:boolean=false
  subscriptionDetails
  monthsDuration;
  planData;
  constructor(private router:Router,private auth:AuthService,private plan:PlansService,private billing:BillingService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Billing' }, { label: 'Details', active: true },];
    debugger;
    this.subscriptionDetails = this.auth.getSubscriptionDetail()
    if(this.subscriptionDetails.subscriptionType=='trial_permissions'){
      this.router.navigate([''])      
    }else{
      this.pageNav=[pageNavHistory,pageNavRenewals]
    }
    this.plan.get('/getPlan/'+this.subscriptionDetails.subscriptionType).subscribe(res=>{debugger;this.planData=res})
    console.log(this.subscriptionDetails)
  }

  navClick(tab){
    this.router.navigate([tab.link])
  }

  durationChange(){
    console.log(this.monthsDuration)
  }

  payNow(){
    this.plan.selectedPlan=this.planData
    this.plan.renewalData={monthsDuration:this.monthsDuration}
    this.router.navigate(['/billing/checkout'])
  }
  cancelFutureRequest(){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#ff3d60',
      confirmButtonText: 'Yes, Cancel it!'
    }).then(result => {
      if (result.value) {
        this.billing.updateData('/cancelFutureRequest',"",{}).subscribe((res:any)=>{
          if(res.status=='canceled'){
            Swal.fire('Canceled!','Future Request have been cancelled successfully', 'success').then(result=>{
              this.auth.setSubscriptionDetails().subscribe(res=>{
                this.subscriptionDetails = this.auth.getSubscriptionDetail()
              })
              
            });
          }else{
            Swal.fire({
            title:'Internal Error',
            icon:'error',
            confirmButtonColor: '#34c38f',
            cancelButtonColor: '#ff3d60',
            confirmButtonText: 'Ok'})
          }

        })
        
      }
    });
  }

}
