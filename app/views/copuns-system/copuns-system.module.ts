import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CouponCardComponent} from '../coupon-card/coupon-card.component';
//import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DashboardModule} from '../dashboard/dashboard.module'
import { from } from 'rxjs';


@NgModule({
  declarations: [CouponCardComponent],
  imports: [
    CommonModule,
    DashboardModule
  ],
  exports : [CouponCardComponent]
})
export class CopunsSystemModule { }
