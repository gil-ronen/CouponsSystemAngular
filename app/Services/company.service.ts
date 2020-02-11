import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Coupon } from '../models/CouponModel';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private _http: HttpClient) { }

  getCompanyDetails(url: string) {
    return this._http.get<any>(url);
  }

  getCompanyCoupons(url: string) {
    return this._http.get<Coupon[]>(url);
  }

  addCoupon(url: string, coupon: Coupon) {
    return this._http.post<any>(url, coupon);
  }

  updateCoupon(url: string, coupon: Coupon) {
    return this._http.put<any>(url, coupon);
  }

  deleteCoupon(url: string) {
    return this._http.delete<any>(url);
  }
}
