import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginGuard } from '../LoginGuard';
import { PermissionGuard } from '../PermissionGuard';
import { PrintLabelsComponent } from './print-labels/print-labels.component';
import { SharedModule } from '../shared/shared.module';
import { DispatchComponent } from './dispatch/dispatch.component';
import { OrdersViewComponent } from './orders-view/orders-view.component';
import { ReturntrackingComponent } from './returntracking/returntracking.component';



@NgModule({
  declarations: [
    OrdersViewComponent,
    DispatchComponent,
    ReturntrackingComponent,
    PrintLabelsComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path:'returns',
        component:ReturntrackingComponent,
        canActivate:[LoginGuard,PermissionGuard],
        data:{page:"ReturnsDispatch"}
      },
      {
        path:'dispatch',
        component:DispatchComponent,
        canActivate:[LoginGuard,PermissionGuard],
        data:{page:"ReturnsDispatch"}
      },
      {
        path:'ordersview',
        component:OrdersViewComponent,
        canActivate:[LoginGuard,PermissionGuard],
        data:{page:"Orders"}
      },
    ])
  ],
  providers:[LoginGuard,PermissionGuard]
})
export class OrdersModule { }
