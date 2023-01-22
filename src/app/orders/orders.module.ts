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
import { CustomOrderStatusComponent } from './custom-order-statuses/custom-order-status/custom-order-status.component';
import { AddEditCustomStatusFilterComponent } from './custom-order-statuses/add-edit-custom-status-filter/add-edit-custom-status-filter.component';
import { ViewStatusFiltersComponent } from './custom-order-statuses/view-status-filters/view-status-filters.component';
import { FilterTypeOrderStatusComponent } from './custom-order-statuses/filter-type-order-status/filter-type-order-status.component';
import { FilterTypeCustomOrderStatusComponent } from './custom-order-statuses/filter-type-custom-order-status/filter-type-custom-order-status.component';
import { FilterTypeDateRangeComponent } from './custom-order-statuses/filter-type-date-range/filter-type-date-range.component';
import { FilterTypeOrderPayoutComponent } from './custom-order-statuses/filter-type-order-payout/filter-type-order-payout.component';



@NgModule({
  declarations: [
    OrdersViewComponent,
    DispatchComponent,
    ReturntrackingComponent,
    PrintLabelsComponent,
    CustomOrderStatusComponent,
    AddEditCustomStatusFilterComponent,
    ViewStatusFiltersComponent,
    FilterTypeOrderStatusComponent,
    FilterTypeCustomOrderStatusComponent,
    FilterTypeDateRangeComponent,
    FilterTypeOrderPayoutComponent
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
