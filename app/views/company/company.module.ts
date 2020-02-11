import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRoutingModule } from './company-routing.module';
import { AboutUsComponent } from './about-us/about-us.component';
import { AddCouponComponent } from './add-coupon/add-coupon.component';
import { EditCouponComponent } from './edit-coupon/edit-coupon.component';
import { ShowCouponsComponent } from './show-coupons/show-coupons.component'
import { AlwaysAuthGuard } from '../../gurds/auth.gurd';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CopunsSystemModule } from '../copuns-system/copuns-system.module';
import { NavigateTypeGuard } from '../../gurds/navigateTypeGurd';
//import { AppComponent } from '../../app.component';



@NgModule({
  declarations: [AboutUsComponent, AddCouponComponent, EditCouponComponent, ShowCouponsComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    MatSelectModule,
    FormsModule,
    CopunsSystemModule
  ],
  providers: [AlwaysAuthGuard,NavigateTypeGuard]
})
export class CompanyModule { }
