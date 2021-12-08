import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AddReturnedStockComponent } from './add-returned-stock/add-returned-stock.component';
import { DscSkuEditComponent } from './dsc-sku-edit/dsc-sku-edit.component';
import { DscSkuTracking } from './dsc-sku-tracking/dsc-sku-tracking.component';
import { SkuEditSheetComponent } from './sku-edit-sheet/sku-edit-sheet.component';
import { SkuOverviewComponent } from './sku-overview/sku-overview.component';
import { StockChecklistComponent } from './stock-checklist/stock-checklist.component';
import { RouterModule } from '@angular/router';
import { LoginGuard } from '../LoginGuard';
import { PermissionGuard } from '../PermissionGuard';
import { AddShopComponent } from '../users/add-shop/add-shop.component';
import { ProfileComponent } from '../users/profile/profile.component';
import { ShopIdComponent } from '../users/shop-ids/shop-id.component';
import { HorizontalComponent } from '../analytics/horizontal/horizontal.component';
import { OrdersComponent } from './orders/orders.component';
import { NgbAccordionModule, NgbCollapseModule, NgbModalModule, NgbNavModule, NgbPaginationModule, NgbTooltipModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    StockChecklistComponent,
    SkuOverviewComponent,
    SkuEditSheetComponent,
    DscSkuTracking,
    DscSkuEditComponent,
    AddReturnedStockComponent,
    ShopIdComponent,
    AddShopComponent,
    ProfileComponent,
    OrdersComponent
  ],
  imports: [
    SharedModule,
    NgbAccordionModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    
    RouterModule.forChild([
      {
        path:'skuoverview',
        component:HorizontalComponent,
        children:[{path:'',component:SkuOverviewComponent}],
        canActivate:[LoginGuard,PermissionGuard],
        data:{page:"GroupedInventory"}
      },
      {
        path:'inventorytracking',
        component:HorizontalComponent,
        children:[{path:'',component:DscSkuTracking}],
        canActivate:[LoginGuard,PermissionGuard],
        data:{page:"DSCInventory"}
      },
      {
        path:'newinventory',
        component:HorizontalComponent,
        children:[{path:'',component:OrdersComponent}],
        canActivate:[LoginGuard,PermissionGuard],
        data:{page:"DSCInventory"}
      },
    ])
  ],
  providers:[LoginGuard,PermissionGuard]
})
export class ProductModule { }
