import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { constants } from 'src/app/utils/constants';

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
    this.isTrial=subscription.subscriptionType==constants.SUB_TYPE_TRIAL ? true : false
  }

}
