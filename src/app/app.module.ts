import { UpdateordersService } from './updateorders.service';
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
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReturntrackingComponent } from './returntracking/returntracking.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    AddidComponent,
    OrdersComponent,
    NavbarComponent,
    ReturntrackingComponent,
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
    
    

    RouterModule.forRoot([
      {
        path:'',
        component:DashboardComponent
      },
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'darazids',
        component:AddidComponent
      },
      {
        path:'orders',
        component:OrdersComponent
      },
      {
        path:'navbar',
        component:NavbarComponent
      },
      {
        path:'returns',
        component:ReturntrackingComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
