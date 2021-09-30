import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ViewStatementsComponent } from './view-statements/view-statements.component';
import { ViewTransactionsComponent } from './view-transactions/view-transactions.component';
import { RouterModule } from '@angular/router';
import { LoginGuard } from '../LoginGuard';
import { PermissionGuard } from '../PermissionGuard';



@NgModule({
  declarations: [
    ViewTransactionsComponent,
    ViewStatementsComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forRoot([
      {
        path:'transactions',
        component:ViewTransactionsComponent,
        canActivate:[LoginGuard,PermissionGuard],
        data:{page:"Finance"}
      },
      {
        path:'statement',
        component:ViewStatementsComponent,
        canActivate:[LoginGuard,PermissionGuard],
        data:{page:"Finance"}
      },
    ])
  ],
  providers:[LoginGuard,PermissionGuard]
})
export class FinanceModule { }
