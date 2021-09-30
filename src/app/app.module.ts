import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { AnalyticsModule } from './analytics/analytics.module';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FinanceModule } from './finance/finance.module';
import { OrdersModule } from './orders/orders.module';
import { ProductModule } from './product/product.module';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './users/users.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    UsersModule,
    ProductModule,
    OrdersModule,
    FinanceModule,
    CoreModule,
    AnalyticsModule,
    SharedModule,
    ToastrModule.forRoot()

  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
