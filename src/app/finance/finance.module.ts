import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ViewStatementsComponent } from './view-statements/view-statements.component';
import { ViewTransactionsComponent } from './view-transactions/view-transactions.component';
import { RouterModule } from '@angular/router';
import { LoginGuard } from '../guards/LoginGuard';
import { PermissionGuard } from '../guards/PermissionGuard';
import { HorizontalComponent } from '../analytics/horizontal/horizontal.component';
import { SubscriptionGuard } from '../guards/SubscriptionGuard';



@NgModule({
  declarations: [
    ViewTransactionsComponent,
    ViewStatementsComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([
      {
        path:'transactions',
        component:HorizontalComponent,
        children:[{path:'',component:ViewTransactionsComponent}],
        canActivate:[LoginGuard,PermissionGuard,SubscriptionGuard],
        data:{page:"Finance"}
      },
      {
        path:'statement',
        component:HorizontalComponent,
        children:[{path:'',component:ViewStatementsComponent}],
        canActivate:[LoginGuard,PermissionGuard,SubscriptionGuard],
        data:{page:"Finance"}
      },
    ])
  ],
  providers:[LoginGuard,PermissionGuard,SubscriptionGuard]
})
export class FinanceModule {
  constructor(){console.log("Finance module")}
 }
