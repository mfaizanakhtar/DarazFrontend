import { NgModule } from '@angular/core';
import { BankTransferComponent } from './bank-transfer/bank-transfer.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { HorizontalComponent } from '../analytics/horizontal/horizontal.component';
import { LoginGuard } from '../guards/LoginGuard';
import { ArchwizardModule } from 'angular-archwizard';
import { BillingHistoryComponent } from './billing-history/billing-history.component'
import { NgbAccordionModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { BillingRenewalComponent } from './billing-renewal/billing-renewal.component';
import { PageNavComponent } from '../shared/page-nav/page-nav.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ViewScreenshotComponent } from './view-screenshot/view-screenshot.component';
import { SubscriptionGuard } from '../guards/SubscriptionGuard';
import { PaymentCheckoutComponent } from './payment-checkout/payment-checkout.component';


@NgModule({
  declarations: [BankTransferComponent, BillingHistoryComponent, BillingRenewalComponent, ViewScreenshotComponent, PaymentCheckoutComponent],
  imports: [
    SharedModule,
    NgbAccordionModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    NgxDropzoneModule,
    RouterModule.forChild([
      {
        path:'',
        component:HorizontalComponent,
        children:[{path:'banktransfer',component:BankTransferComponent,canActivate:[LoginGuard]}]
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
      },
      {
        path:'',
        component:HorizontalComponent,
        children:[{path:'checkout',component:PaymentCheckoutComponent,canActivate:[LoginGuard]}]
      }
    ]),
    ArchwizardModule 
  ],
  providers:[LoginGuard,SubscriptionGuard]
})
export class BillingModule { }
