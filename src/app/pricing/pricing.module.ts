import { NgModule } from '@angular/core';
import { SubscriptionPricingComponent } from './subscription-pricing/subscription-pricing.component';
import { RouterModule } from '@angular/router';
import { LoginGuard } from '../LoginGuard';
import { SharedModule } from '../shared/shared.module';
import { HorizontalComponent } from '../analytics/horizontal/horizontal.component';



@NgModule({
  declarations: [SubscriptionPricingComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path:'',
        component:HorizontalComponent,
        children:[{path:'',component:SubscriptionPricingComponent,canActivate:[LoginGuard]}]
      }
    ])
  ],
  providers:[LoginGuard]
})
export class PricingModule { }
