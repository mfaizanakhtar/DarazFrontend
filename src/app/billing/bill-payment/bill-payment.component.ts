import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bill-payment',
  templateUrl: './bill-payment.component.html',
  styleUrls: ['./bill-payment.component.scss']
})
export class BillPaymentComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  subscriptionType:any;
  userEmail:String;

  constructor(private route:ActivatedRoute,private auth:AuthService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Billing' }, { label: 'Bill Payment', active: true }];
    this.getData();
  }

  getData(){
    this.route.params.subscribe(params=>{
      this.subscriptionType=params['subType'];
    })

    this.userEmail = this.auth.getCurrentUser().useremail;
  }

}
