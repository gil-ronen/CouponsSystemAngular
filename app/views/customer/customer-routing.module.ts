import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';
import { AlwaysAuthGuard } from '../../gurds/auth.gurd';
import { PurchaseCouponsComponent } from './purchase-coupons/purchase-coupons.component';
import { ShowMyCouponsComponent } from './show-my-coupons/show-my-coupons.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NavigateTypeGuard } from '../../gurds/navigateTypeGurd';

 
const routes: Routes = [
    {
      path: '',
      component: DashboardComponent,
      data: {
        title: ''
      },
    },
    {
        path: 'about-me',
        component: AboutMeComponent,
        data: {
            title: 'About Me',
            role : 'Customer'
        },
        canActivate: [AlwaysAuthGuard,NavigateTypeGuard]
    },
    {
        path: 'purchase-coupons',
        component: PurchaseCouponsComponent,
        data: {
            title: 'Purchase Coupons',
            role : 'Customer'
        },
        canActivate: [AlwaysAuthGuard,NavigateTypeGuard]
    },
    {
        path: 'show-my-coupons',
        component: ShowMyCouponsComponent,
        data: {
            title: 'Show My Coupons',
            role : 'Customer'
        },
        canActivate: [AlwaysAuthGuard,NavigateTypeGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule { }
