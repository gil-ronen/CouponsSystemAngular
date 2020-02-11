import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { AboutMeComponent  } from './about-me/about-me.component';
import { PurchaseCouponsComponent } from './purchase-coupons/purchase-coupons.component';
import { ShowMyCouponsComponent } from './show-my-coupons/show-my-coupons.component';
import { AlwaysAuthGuard } from '../../gurds/auth.gurd';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

import { CopunsSystemModule } from '../copuns-system/copuns-system.module';
import { NavigateTypeGuard } from '../../gurds/navigateTypeGurd';




@NgModule({
  declarations: [AboutMeComponent, PurchaseCouponsComponent, ShowMyCouponsComponent ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MatSelectModule,
    FormsModule,
    CopunsSystemModule
  ],
  providers: [AlwaysAuthGuard,NavigateTypeGuard],

})
export class CustomerModule { }
