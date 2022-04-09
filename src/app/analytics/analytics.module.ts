import { HorizontalnavbarComponent } from './../shared/horizontalnavbar/horizontalnavbar.component';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { LoginGuard } from '../LoginGuard';
import { signupSubscriptionGuard } from '../signupSubscriptionGuard';
import { AnalyticsContentComponent } from './analytics-content/analytics-content.component';
import { StatComponent } from './stat/stat.component';
import { HorizontalComponent } from './horizontal/horizontal.component';
import { ProfitAnalyticsComponent } from './profit-analytics/profit-analytics.component';
import { PermissionGuard } from '../PermissionGuard';



@NgModule({
  declarations: [
    DashboardComponent,
    AnalyticsContentComponent,
    StatComponent,
    ProfitAnalyticsComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path:'dashboard',
        component:DashboardComponent,
        canActivate:[LoginGuard]
      },
      {
        path:'',
        component:HorizontalComponent,
        children:[
          {path:'',component:AnalyticsContentComponent,canActivate:[LoginGuard,signupSubscriptionGuard]}
        ]
      },
      {
        path:'profitibility',
        component:HorizontalComponent,
        children:[
          {path:'',component:ProfitAnalyticsComponent,canActivate:[LoginGuard,PermissionGuard],data:{page:"Profitibility"}}
        ],
        
      }
    ])
  ],
  exports:[
  ],
  providers:[LoginGuard,PermissionGuard,signupSubscriptionGuard],
})
export class AnalyticsModule { }
