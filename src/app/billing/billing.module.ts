import { NgModule } from '@angular/core';
import { BillPaymentComponent } from './bill-payment/bill-payment.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { HorizontalComponent } from '../analytics/horizontal/horizontal.component';
import { LoginGuard } from '../LoginGuard';
import { ArchwizardModule } from 'angular-archwizard'


@NgModule({
  declarations: [BillPaymentComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path:'',
        component:HorizontalComponent,
        children:[{path:'',component:BillPaymentComponent,canActivate:[LoginGuard]}]
      }
    ]),
    ArchwizardModule 
  ],
  providers:[LoginGuard]
})
export class BillingModule { }
