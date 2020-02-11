import { Coupon } from './CouponModel';

export interface Customer {
    coupons?: Coupon[];
    email: string;
    firstName: string;
    id?: number;
    lastName: string;
    password: string;
  }