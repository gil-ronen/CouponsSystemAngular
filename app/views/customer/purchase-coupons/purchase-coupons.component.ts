import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../Services/customer.service';
import { environment } from '../../../../environments/environment';
import { Coupon } from '../../../models/CouponModel';
import { ShowMyCouponsComponent } from '../show-my-coupons/show-my-coupons.component';

@Component({
  selector: 'app-purchase-coupons',
  templateUrl: './purchase-coupons.component.html',
  styleUrls: ['./purchase-coupons.component.css']
})
export class PurchaseCouponsComponent implements OnInit {

  coupons: any;

  constructor(private _customerService: CustomerService) { }

  ngOnInit() {
    this.getAllCoupons();

  }

  getAllCoupons() {

    var token = localStorage.getItem('token');
    var url = environment.baseApiUrl + `/Customer/getAllCouponsInTheSystem/${token}`;

    this._customerService.getCustomerCoupons(url).subscribe(data => {
      //console.log(data);
      this.coupons = data;
    }, error => console.log(error))
  }



}
