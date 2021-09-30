import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { LoginGuard } from '../LoginGuard';



@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path:'',
        component:DashboardComponent,
        canActivate:[LoginGuard]
      },
    ])
  ],
  providers:[LoginGuard]
})
export class AnalyticsModule { }
