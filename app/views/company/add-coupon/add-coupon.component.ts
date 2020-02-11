import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../Services/company.service';
import { environment } from '../../../../environments/environment';
import { Coupon } from '../../../models/CouponModel';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.css']
})
export class AddCouponComponent implements OnInit {

  couponToAdd: any =
    {
      "amount": "",
      "category": "",
      "description": "",
      "endDate": "",
      "image": "",
      "price": "",
      "startDate": "",
      "title": ""
    };

  selectedCategory = "";
  categories = ['Restaurant', 'Electricity', 'Vacation', 'Food'];

  constructor(private _companyService: CompanyService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  checkValidInput(): boolean {
    if (this.selectedCategory == "")
    {
      this.toastr.error(`Please choose coupon category`, 'Error');
      return false;
    }
    if (this.couponToAdd.title == "") {
      this.toastr.error(`Please give a title to your coupon`, 'Error');
      return false;
    }
    if (this.couponToAdd.description == "") {
      this.toastr.error(`Please write description to your coupon`, 'Error');
      return false;
    }
    if (this.couponToAdd.amount == "" || this.couponToAdd.amount<0) {
      this.toastr.error(`Please enter valid amount`, 'Error');
      return false;
    }
    if (this.couponToAdd.price == "" || this.couponToAdd.price<0) {
      this.toastr.error(`Please enter valid price`, 'Error');
      return false;
    }
    if (this.couponToAdd.startDate == "") {
      this.toastr.error(`Please enter a start valid date to your coupon`, 'Error');
      return false;
    }
    if (this.couponToAdd.endDate == "") {
      this.toastr.error(`Please enter an expired date to your coupon`, 'Error');
      return false;
    }
    if (this.couponToAdd.image == "") {
      this.toastr.error(`Please enter an url image to your coupon`, 'Error');
      return false;
    }
    return true;
  }



  addCoupon() {
    if (this.checkValidInput()) {
      var token = localStorage.getItem('token');
      var url = environment.baseApiUrl + `/Company/addCoupon/${token}`;

      this.couponToAdd.category = this.selectedCategory;
      this._companyService.addCoupon(url, this.couponToAdd).subscribe(data => {
        //console.log(data);
        this.toastr.success(`Coupon ${this.couponToAdd.title} added successfully`, 'Success');
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 400) {
            this.toastr.error(`Add coupon ${this.couponToAdd.title} Failed: ${err.error}`, 'Error');
          }
        }
      })
    }
  }

  ChooseCategory(event) {
    this.selectedCategory = event.value;
    //console.log(this.selectedCategory)
  }
}
