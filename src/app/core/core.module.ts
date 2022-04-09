import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { SetSubAccPasswordComponent } from './set-sub-acc-password/set-sub-acc-password.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RecoverPasswordComponent,
    SetSubAccPasswordComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path:'',
        component:LoginComponent
      },
      {
        path:'register',
        component:RegisterComponent
      },
      {
        path:'recoverPassword',
        component:RecoverPasswordComponent
      },
      {
        path:'verifyAndActiveAccount',
        component:SetSubAccPasswordComponent
      }
    ])
  ]
})
export class CoreModule { }
