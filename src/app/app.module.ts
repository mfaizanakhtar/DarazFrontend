import { HttpClientModule } from '@angular/common/http';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AddidComponent } from './addid/addid.component';
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
import { AddUsersComponent } from './add-users/add-users.component';
import { LoginGuard } from './LoginGuard';








@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    AddidComponent,
    OrdersComponent,
    NavbarComponent,
    ReturntrackingComponent,
    DispatchComponent,
    UsersComponent,
    AddUsersComponent,
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
    MatDialogModule,
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
        path:'darazids',
        component:AddidComponent,
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
        canActivate:[LoginGuard]
      },
      {
        path:'adduser',
        component:AddUsersComponent,
        canActivate:[LoginGuard]
      }
    ]),
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
