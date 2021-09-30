import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminGuard } from '../AdminGuard';
import { LoginGuard } from '../LoginGuard';
import { SharedModule } from '../shared/shared.module';
import { AddSubaccountComponent } from './add-subaccount/add-subaccount.component';
import { AddUsersComponent } from './add-users/add-users.component';
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
        path:'users',
        component:UsersComponent,
        canActivate:[LoginGuard,AdminGuard]
      },
      {
        path:'adduser',
        component:AddUsersComponent,
        canActivate:[LoginGuard]
      },
    ])
  ],
  providers:[LoginGuard,AdminGuard]
})
export class UsersModule { }
