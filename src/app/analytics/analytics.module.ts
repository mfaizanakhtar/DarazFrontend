import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { LoginGuard } from '../LoginGuard';
import { AnalyticsDashboardComponent } from './analytics-dashboard/analytics-dashboard.component';
import { AnalyticsContentComponent } from './analytics-content/analytics-content.component';
import { StatComponent } from './stat/stat.component';
import { HorizontalComponent } from './horizontal/horizontal.component';




@NgModule({
  declarations: [
    DashboardComponent,
    AnalyticsDashboardComponent,
    AnalyticsContentComponent,
    StatComponent,
    HorizontalComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path:'',
        component:DashboardComponent,
        canActivate:[LoginGuard]
      },
      {
        path:'analytics',
        component:HorizontalComponent,
      }
    ])
  ],
  providers:[LoginGuard]
})
export class AnalyticsModule { }
