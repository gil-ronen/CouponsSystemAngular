import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../Services/customer.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-show-my-coupons',
  templateUrl: './show-my-coupons.component.html',
  styleUrls: ['./show-my-coupons.component.css']
})
export class ShowMyCouponsComponent implements OnInit {

  constructor(private _customerService: CustomerService) { }

  basicUrl = environment.baseApiUrl + "/Customer/";

  coupons: any;
  maxPrice: number = 0;
  selectedCategory = "";
  categories = ['Restaurant', 'Electricity', 'Vacation', 'Food'];

  ngOnInit() {
    this.getCustomerCoupons();
  }

  getCustomerCoupons() {

    var token = localStorage.getItem('token');
    var url = this.basicUrl + `getCustomerCoupons/${token}`;

    this._customerService.getCustomerCoupons(url).subscribe(data => {
      //console.log(data);
      this.coupons = data;
    }, error => console.log(error))
  }

  getCustomerCouponsByCategory() {

    var token = localStorage.getItem('token');

    if (this.selectedCategory != "") {
      var url = this.basicUrl + `getCustomerCouponsByCategory/${token}?category=${this.selectedCategory}`;
      this._customerService.getCustomerCoupons(url).subscribe(data => {
        //console.log(data);
        this.coupons = data;
      }, error => console.log(error))
    }
  }

  getCustomerCouponsByMaxPrice() {

    var token = localStorage.getItem('token');
    var url = this.basicUrl + `getCustomerCouponsByMaxPrice/${token}?maxPrice=${this.maxPrice}`;

    this._customerService.getCustomerCoupons(url).subscribe(data => {
      //console.log(data);
      this.coupons = data;
    }, error => console.log(error))
  }

  ChooseCategory(event) {
    this.selectedCategory = event.value;
    this.getCustomerCouponsByCategory();
  }


}
