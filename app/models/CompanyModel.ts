import { Coupon } from './CouponModel';


export interface Company {
    id?: number;
    name: string;
    email: string;
    password: string;
    coupons?: Coupon[];
}