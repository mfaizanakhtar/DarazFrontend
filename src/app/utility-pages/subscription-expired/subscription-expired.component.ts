import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscription-expired',
  templateUrl: './subscription-expired.component.html',
  styleUrls: ['./subscription-expired.component.scss']
})
export class SubscriptionExpiredComponent implements OnInit {

  constructor(private auth:AuthService) { }
  isTrial=false;

  ngOnInit(): void {
    var subscription = this.auth.getSubscriptionDetail();
    this.isTrial=subscription.subscriptionType=='trial_permissions' ? true : false
  }

}
