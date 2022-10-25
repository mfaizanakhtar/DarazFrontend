import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginGuard } from '../guards/LoginGuard';
import { PermissionGuard } from '../guards/PermissionGuard';
import { PrintLabelsComponent } from './print-labels/print-labels.component';
import { SharedModule } from '../shared/shared.module';
import { DispatchComponent } from './dispatch/dispatch.component';
import { OrdersViewComponent } from './orders-view/orders-view.component';
import { ReturntrackingComponent } from './returntracking/returntracking.component';
import { HorizontalComponent } from '../analytics/horizontal/horizontal.component';
import { SubscriptionGuard } from '../guards/SubscriptionGuard';



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
        component:HorizontalComponent,
        children:[{path:'',component:ReturntrackingComponent}],
        canActivate:[LoginGuard,PermissionGuard,SubscriptionGuard],
        data:{page:"ReturnsDispatch"}
      },
      {
        path:'dispatch',
        component:HorizontalComponent,
        children:[{path:'',component:DispatchComponent}],
        canActivate:[LoginGuard,PermissionGuard,SubscriptionGuard],
        data:{page:"ReturnsDispatch"}
      },
      {
        path:'ordersview',
        component:HorizontalComponent,
        children:[{path:'',component:OrdersViewComponent}],
        canActivate:[LoginGuard,PermissionGuard,SubscriptionGuard],
        data:{page:"Orders"}
      },
    ])
  ],
  providers:[LoginGuard,PermissionGuard,SubscriptionGuard]
})
export class OrdersModule { }
