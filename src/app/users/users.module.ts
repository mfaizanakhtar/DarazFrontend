import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminGuard } from '../AdminGuard';
import { HorizontalComponent } from '../analytics/horizontal/horizontal.component';
import { LoginGuard } from '../LoginGuard';
import { SharedModule } from '../shared/shared.module';
import { AddSubaccountComponent } from './add-subaccount/add-subaccount.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { ProfileComponent } from './profile/profile.component';
import { ShopIdComponent } from './shop-ids/shop-id.component';
import { UsersComponent } from './users/users.component';



@NgModule({
  declarations: [
    UsersComponent,
    AddUsersComponent,
    AddSubaccountComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path:'',
        component:UsersComponent,
        canActivate:[LoginGuard,AdminGuard]
      },
      // {
      //   path:'adduser',
      //   component:AddUsersComponent,
      //   canActivate:[LoginGuard]
      // },
      {
        path:'profile',
        component:HorizontalComponent,
        children:[{path:'',component:ProfileComponent}],
        canActivate:[LoginGuard]
      },
      {
        path:'shops',
        component:HorizontalComponent,
        children:[{path:'',component:ShopIdComponent}]
      }
    ])
  ],
  providers:[LoginGuard,AdminGuard]
})
export class UsersModule { }
