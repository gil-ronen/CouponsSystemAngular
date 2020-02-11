import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlwaysAuthGuard } from '../../gurds/auth.gurd';
import { AboutUsComponent } from './about-us/about-us.component';
import { AddCouponComponent } from './add-coupon/add-coupon.component';
import { EditCouponComponent } from './edit-coupon/edit-coupon.component';
import { ShowCouponsComponent } from './show-coupons/show-coupons.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NavigateTypeGuard } from '../../gurds/navigateTypeGurd';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent, 
    data: {
      title: ''
    }
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
    data: {
      title: 'About Us',
      role:'Company'
    },
    canActivate: [AlwaysAuthGuard,NavigateTypeGuard]
  },
  {
    path: 'add-coupon',
    component: AddCouponComponent,
    data: {
      title: 'Add Coupon',
      role:'Company'
    },
    canActivate: [AlwaysAuthGuard,NavigateTypeGuard]
  },
  {
    path: 'edit-coupon',
    component: EditCouponComponent,
    data: {
      title: 'Edit Coupon',
      role:'Company'
    },
    canActivate: [AlwaysAuthGuard,NavigateTypeGuard]
  },
  {
    path: 'show-coupons',
    component: ShowCouponsComponent,
    data: {
      title: 'Show Coupons',
      role:'Company'
    },
    canActivate: [AlwaysAuthGuard,NavigateTypeGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule {}
