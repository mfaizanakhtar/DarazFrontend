import { HorizontalComponent } from './../analytics/horizontal/horizontal.component';
import { RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionExpiredComponent } from './subscription-expired/subscription-expired.component';
import { AdminGuard } from '../AdminGuard';
import { LoginGuard } from '../LoginGuard';



@NgModule({
  declarations: [SubscriptionExpiredComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:'expired',
        component:HorizontalComponent,
        children:[{path:'',component:SubscriptionExpiredComponent}]
        // canActivate:[LoginGuard,AdminGuard]
      }
    ])
  ],
  providers:[LoginGuard,AdminGuard]
})
export class UtilityPagesModule { }
