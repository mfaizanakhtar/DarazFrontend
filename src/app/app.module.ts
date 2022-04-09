import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
// import { AnalyticsModule } from './analytics/analytics.module';

import { AppComponent } from './app.component';
// import { CoreModule } from './core/core.module';
// import { FinanceModule } from './finance/finance.module';
// import { OrdersModule } from './orders/orders.module';
// import { ProductModule } from './product/product.module';
import { SharedModule } from './shared/shared.module';
// import { UsersModule } from './users/users.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    // UsersModule,
    // ProductModule,
    // OrdersModule,
    // FinanceModule,
    // CoreModule,
    // AnalyticsModule,
    SharedModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      {path:'',loadChildren:()=>import('./analytics/analytics.module').then(m=>m.AnalyticsModule)},
      {path:'login',loadChildren:()=>import('./core/core.module').then(m=>m.CoreModule)},
      {path:'finance',loadChildren:()=>import('./finance/finance.module').then(m=>m.FinanceModule)},
      {path:'orders',loadChildren:()=>import('./orders/orders.module').then(m=>m.OrdersModule)},
      {path:'products',loadChildren:()=>import('./product/product.module').then(m=>m.ProductModule)},
      {path:'users',loadChildren:()=>import('./users/users.module').then(m=>m.UsersModule)},
      {path:'pricing',loadChildren:()=>import('./pricing/pricing.module').then(m=>m.PricingModule)},
      {path:'billing',loadChildren:()=>import('./billing/billing.module').then(m=>m.BillingModule)}
    ])

  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
