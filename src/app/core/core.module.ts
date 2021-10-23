import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { LoginupdateComponent } from './loginupdate/loginupdate.component';



@NgModule({
  declarations: [
    LoginComponent,
    LoginupdateComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path:'',
        component:LoginupdateComponent
      },
    ])
  ]
})
export class CoreModule { }
