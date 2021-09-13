import { HttpClientModule } from '@angular/common/http';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ShopIdComponent } from './shop-ids/shop-id.component';
import { interval, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { OrdersComponent } from './orders/orders.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { DatatableComponent, NgxDatatableModule } from '@swimlane/ngx-datatable';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReturntrackingComponent } from './returntracking/returntracking.component';
import { DispatchComponent } from './dispatch/dispatch.component';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import { UsersComponent } from './users/users.component';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { NgxBarcodeModule } from 'ngx-barcode';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { AddUsersComponent } from './add-users/add-users.component';
import { LoginGuard } from './LoginGuard';
import { AddShopComponent } from './add-shop/add-shop.component';
import { OrdersViewComponent } from './orders-view/orders-view.component';
import { PrintLabelsComponent } from './print-labels/print-labels.component';
import { LabelstestComponent } from './labelstest/labelstest.component';
import { NgxPrintModule } from 'ngx-print';
import {MatTabsModule} from '@angular/material/tabs';
import { ProfileComponent } from './profile/profile.component';
import { AdminGuard } from './AdminGuard';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { StockChecklistComponent } from './stock-checklist/stock-checklist.component';
import { SkuOverviewComponent } from './sku-overview/sku-overview.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { SkuEditSheetComponent } from './sku-edit-sheet/sku-edit-sheet.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ViewTransactionsComponent } from './view-transactions/view-transactions.component';
import { ViewStatementsComponent } from './view-statements/view-statements.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { InventoryTrackingComponent } from './inventory-tracking/inventory-tracking.component';
import { DscSkuEditComponent } from './dsc-sku-edit/dsc-sku-edit.component';













@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    ShopIdComponent,
    OrdersComponent,
    NavbarComponent,
    ReturntrackingComponent,
    DispatchComponent,
    UsersComponent,
    AddUsersComponent,
    AddShopComponent,
    OrdersViewComponent,
    PrintLabelsComponent,
    LabelstestComponent,
    ProfileComponent,
    StockChecklistComponent,
    SkuOverviewComponent,
    SkuEditSheetComponent,
    ViewTransactionsComponent,
    ViewStatementsComponent,
    InventoryTrackingComponent,
    DscSkuEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    NgxDatatableModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    CommonModule,
    MatMenuModule,
    MatTableModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatDialogModule,
    NgxPrintModule,
    NgxBarcodeModule,
    MatTabsModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatBottomSheetModule,
    MatExpansionModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      {
        path:'',
        component:DashboardComponent,
        canActivate:[LoginGuard]
      },
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'shops',
        component:ShopIdComponent,
        canActivate:[LoginGuard]
      },
      {
        path:'orders',
        component:OrdersComponent,
        canActivate:[LoginGuard]
      },
      {
        path:'navbar',
        component:NavbarComponent
      },
      {
        path:'returns',
        component:ReturntrackingComponent,
        canActivate:[LoginGuard]
      },
      {
        path:'dispatch',
        component:DispatchComponent,
        canActivate:[LoginGuard]
      },
      {
        path:'users',
        component:UsersComponent,
        canActivate:[LoginGuard,AdminGuard]
      },
      {
        path:'adduser',
        component:AddUsersComponent,
        canActivate:[LoginGuard]
      },
      {
        path:'ordersview',
        component:OrdersViewComponent,
        canActivate:[LoginGuard]
      },
      {
        path:'printLabels',
        component:PrintLabelsComponent,
        canActivate:[LoginGuard]
      },
      {
        path:'labelstest',
        component:LabelstestComponent,
        canActivate:[LoginGuard]
      },
      {
        path:'profile',
        component:ProfileComponent,
        canActivate:[LoginGuard]
      },
      {
        path:'skuoverview',
        component:SkuOverviewComponent,
        canActivate:[LoginGuard]
      },
      {
        path:'transactions',
        component:ViewTransactionsComponent,
        canActivate:[LoginGuard]
      },
      {
        path:'statement',
        component:ViewStatementsComponent,
        canActivate:[LoginGuard]
      },
      {
        path:'inventorytracking',
        component:InventoryTrackingComponent,
        canActivate:[LoginGuard]
      }
    ]),
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [LoginGuard,AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
