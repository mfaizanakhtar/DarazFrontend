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
  defaultStep
  isUpgrade:boolean
  isFutureRequest:boolean=false
  currentSubscription:any
  files: File[] = [];  
  screenShots:Array<any>=[]

  constructor(private route:ActivatedRoute,private auth:AuthService,private plan:PlansService,private lookup:LookupService,private billing:BillingService,private router:Router) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Billing' }, { label: 'Bill Payment', active: true }];
    this.getData();
    this.lookup.getLookupDetail("bankDetails").subscribe(res=>this.bankDetail = res)
    if(this.plan.isRenewal){
      this.subscriptionMonths=this.plan.renewalData.monthsDuration
      this.defaultStep=1
    }else this.defaultStep=0
    this.getIsUpgrade()
    if(this.isUpgrade) this.currentSubscription = this.auth.getSubscriptionDetail()
  }

  getData(){
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
      isFutureRequest:this.isFutureRequest,
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

  getIsUpgrade(){
    this.isUpgrade = this.route.snapshot.queryParamMap.get('isUpgrade')=='true' ? true: false
  }

  onSelect(event) {  
    console.log(event);  
    this.files.push(...event.addedFiles);  
  
      var latestFileIndex=this.files.length-1
      console.log(this.files[latestFileIndex])
      this.fileToBase64(this.files[latestFileIndex])
            .then(result=>{
              const base64String = result.replace('data:', '').replace(/^.+,/, '');// To remove data url part
              this.screenShots.push(base64String);
            });          
 
}  

  fileToBase64 = (file:File):Promise<string> => {
  return new Promise<string> ((resolve,reject)=> {
       const reader = new FileReader();
       reader.readAsDataURL(file);
       reader.onload = () => resolve(reader.result.toString());
       reader.onerror = error => reject(error);
   })
  }

  onRemove(event) {  
      console.log(event);  
      this.files.splice(this.files.indexOf(event), 1); 
      this.screenShots.splice(this.files.indexOf(event), 1);  
      console.log(this.screenShots) 
  }  



}
