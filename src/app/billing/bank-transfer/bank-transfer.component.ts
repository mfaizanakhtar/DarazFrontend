import { BillingService } from '../../services/billing.service';
import { bankDetailType } from './bank-transfer.model';
import { LookupService } from '../../services/lookup.service';
import { PlansService } from '../../services/plans.service';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import compress from 'compress-base64';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-bank-transfer',
  templateUrl: './bank-transfer.component.html',
  styleUrls: ['./bank-transfer.component.scss']
})
export class BankTransferComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  subscriptionType:any;
  userEmail:String;
  bankDetail:bankDetailType;
  transactionId:String=""
  isUpgrade:boolean
  isFutureRequest:boolean=false
  currentSubscription:any
  billingAmount:Number=0;
  files: File[] = [];  
  screenShots:Array<any>=[]
  btnSubmitClick:boolean=false;

  constructor(private route:ActivatedRoute,private auth:AuthService,private plan:PlansService,private lookup:LookupService,private billing:BillingService,private router:Router) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Billing' }, { label: 'Bill Payment', active: true }];
    this.getData();
    this.lookup.getLookupDetail("bankDetails").subscribe(res=>this.bankDetail = res)
    this.getIsUpgrade()
    if(this.isUpgrade) this.currentSubscription = this.auth.getSubscriptionDetail()
  }

  getData(){
    this.userEmail = this.auth.getCurrentUser().userEmail;

    this.subscriptionType = this.plan.selectedPlan
    this.billingAmount = this.plan.billingAmount
    if(!this.subscriptionType){
      this.router.navigate([''])
    }
    
  }

  submitBankTransferDetails(){
    this.btnSubmitClick=false
    console.log(this.transactionId.length)
    if(this.files.length>0 && this.transactionId.length>0){
    this.billing.updateData('/updateBTBillingTransaction',this.plan.billingId,{
      bankDetail:this.bankDetail,
      transactionId:this.transactionId,
      status:"pending approval",
      screenShot:this.screenShots[0]
    }).subscribe((res:any)=>{
      Swal.fire({
        title: 'Bank Transfer Request Received',
        text: 'Your payment will be validated and subscription updated shortly',
        icon: 'success',
        confirmButtonColor: '#34c38f',
        confirmButtonText: 'Ok'
      }).then(res=>{
        this.router.navigate(['/billing/details'])
      })
    },(httpError:HttpErrorResponse)=>{
      console.log(httpError.error);
    })
  }
  this.btnSubmitClick=true
  }

  getIsUpgrade(){
    this.isUpgrade = this.route.snapshot.queryParamMap.get('isUpgrade')=='true' ? true: false
  }

  onSelect(event) {  
    console.log(event);
 
    this.files=event.addedFiles
  
      var latestFileIndex=this.files.length-1
      console.log(this.files[latestFileIndex])
      this.fileToBase64(this.files[latestFileIndex])
            .then(result=>{
              const base64String = result.replace('data:', '').replace(/^.+,/, '');// To remove data url part
              this.screenShots=[base64String];
              console.log(this.screenShots)
            });  
 
}  

  fileToBase64 = (file:File):Promise<string> => {
  return new Promise<string> ((resolve,reject)=> {
       const reader = new FileReader();
       reader.readAsDataURL(file);
       reader.onload = () => {
         compress(reader.result.toString(),{
          width: 400,
          type: 'image/jpeg', // default
          max: 200, // max size
          min: 20, // min size
          quality: 0.8
         }).then((result:any)=>{
          resolve(result);
         })
        
       }
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
