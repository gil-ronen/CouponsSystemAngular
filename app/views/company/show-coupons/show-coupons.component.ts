import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../Services/company.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-show-coupons',
  templateUrl: './show-coupons.component.html',
  styleUrls: ['./show-coupons.component.css']
})
export class ShowCouponsComponent implements OnInit {

  constructor(private _companyService: CompanyService) { }

  basicUrl = environment.baseApiUrl + "/Company/";

  coupons: any;
  maxPrice: number = 0;
  selectedCategory = "";
  categories = ['Restaurant', 'Electricity', 'Vacation', 'Food'];

  ngOnInit() {
    this.getCompanyCoupons();
  }

  getCompanyCoupons() {

    var token = localStorage.getItem('token');
    var url = this.basicUrl + `getCompanyCoupons/${token}`;

    this._companyService.getCompanyCoupons(url).subscribe(data => {
      this.coupons = data;

    }, error => console.log(error))

  }

  getCompanyCouponsByCategory() {
    var token = localStorage.getItem('token');

    if (this.selectedCategory != "") {
      var url = this.basicUrl + `getCompanyCouponsByCategory/${token}?category=${this.selectedCategory}`;
      this._companyService.getCompanyCoupons(url).subscribe(data => {
        // console.log(data);
        this.coupons = data;
      }, error => console.log(error))
    }
  }

  getCompanyCouponsByMaxPrice() {
    var token = localStorage.getItem('token');
    var url = this.basicUrl + `getCompanyCouponsByMaxPrice/${token}?maxPrice=${this.maxPrice}`;

    this._companyService.getCompanyCoupons(url).subscribe(data => {
      // console.log(data);
      this.coupons = data;
    }, error => console.log(error))
  }

  ChooseCategory(event) {
    this.selectedCategory = event.value;
    this.getCompanyCouponsByCategory();
  }

}
