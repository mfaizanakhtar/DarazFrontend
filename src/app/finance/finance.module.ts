import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ViewStatementsComponent } from './view-statements/view-statements.component';
import { ViewTransactionsComponent } from './view-transactions/view-transactions.component';
import { RouterModule } from '@angular/router';
import { LoginGuard } from '../LoginGuard';
import { PermissionGuard } from '../PermissionGuard';
import { HorizontalComponent } from '../analytics/horizontal/horizontal.component';



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
        canActivate:[LoginGuard,PermissionGuard],
        data:{page:"Finance"}
      },
      {
        path:'statement',
        component:HorizontalComponent,
        children:[{path:'',component:ViewStatementsComponent}],
        canActivate:[LoginGuard,PermissionGuard],
        data:{page:"Finance"}
      },
    ])
  ],
  providers:[LoginGuard,PermissionGuard]
})
export class FinanceModule {
  constructor(){console.log("Finance module")}
 }
