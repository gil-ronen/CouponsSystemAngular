import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from '../models/CustomerModel';
import { Coupon } from '../models/CouponModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  constructor(private _http: HttpClient) { }

  getCustomerDetails(url: string) {
    return this._http.get<any>(url);
  }

  getCustomerCoupons(url: string)
  {
    return this._http.get<Coupon[]>(url);
  }

  purchaseCoupon(url: string, coupon:Coupon)
  {
    return this._http.post<any>(url, coupon);
  }

}
