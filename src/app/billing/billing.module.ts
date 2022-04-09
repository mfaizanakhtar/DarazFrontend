import { NgModule } from '@angular/core';
import { BillPaymentComponent } from './bill-payment/bill-payment.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { HorizontalComponent } from '../analytics/horizontal/horizontal.component';
import { LoginGuard } from '../LoginGuard';
import { ArchwizardModule } from 'angular-archwizard';
import { BillingHistoryComponent } from './billing-history/billing-history.component'
import { NgbAccordionModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { BillingRenewalComponent } from './billing-renewal/billing-renewal.component';
import { PageNavComponent } from '../shared/page-nav/page-nav.component';


@NgModule({
  declarations: [BillPaymentComponent, BillingHistoryComponent, BillingRenewalComponent],
  imports: [
    SharedModule,
    NgbAccordionModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    RouterModule.forChild([
      {
        path:'',
        component:HorizontalComponent,
        children:[{path:'',component:BillPaymentComponent,canActivate:[LoginGuard]}]
      },
      {
        path:'',
        component:HorizontalComponent,
        children:[{path:'details',component:BillingHistoryComponent,canActivate:[LoginGuard]}]
      },
      {
        path:'',
        component:HorizontalComponent,
        children:[{path:'renewal',component:BillingRenewalComponent,canActivate:[LoginGuard]}]
      }
    ]),
    ArchwizardModule 
  ],
  providers:[LoginGuard]
})
export class BillingModule { }
