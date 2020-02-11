import { Component, OnInit, Input } from '@angular/core';
import { CompanyService } from '../../../Services/company.service';
import { environment } from '../../../../environments/environment';
import { Coupon } from '../../../models/CouponModel';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-coupon',
  templateUrl: './edit-coupon.component.html',
  styleUrls: ['./edit-coupon.component.css']
})
export class EditCouponComponent implements OnInit {

  selectedCoupon: any =
    {
      "id": 0,
      "amount": "",
      "category": "",
      "description": "",
      "endDate": "",
      "image": "",
      "price": "",
      "startDate": "",
      "title": ""
    };

  couponsList: Coupon[];
  selectedCategory = "";
  categories = ['Restaurant', 'Electricity', 'Vacation', 'Food'];

  constructor(private _companyService: CompanyService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getCompanyCoupons();
  }

  checkValidInputToDelete(): boolean {
    if (this.selectedCoupon.title == "") {
      this.toastr.error(`Please choose coupon from the list`, 'Error');
      return false;
    }
    return true;
  }

  checkValidInputToUpdate(): boolean {
    if (this.selectedCoupon.id == 0) {
      this.toastr.error(`Please choose coupon from the list`, 'Error');
      return false;
    }
    if (this.selectedCategory == "") {
      this.toastr.error(`Please choose coupon category`, 'Error');
      return false;
    }
    if (this.selectedCoupon.title == "") {
      this.toastr.error(`Please give a title to your coupon`, 'Error');
      return false;
    }
    if (this.selectedCoupon.description == "") {
      this.toastr.error(`Please write description to your coupon`, 'Error');
      return false;
    }
    if (this.selectedCoupon.amount == "" || this.selectedCoupon.amount < 0) {
      this.toastr.error(`Please enter valid amount`, 'Error');
      return false;
    }
    if (this.selectedCoupon.price == "" || this.selectedCoupon.price < 0) {
      this.toastr.error(`Please enter valid price`, 'Error');
      return false;
    }
    if (this.selectedCoupon.startDate == "") {
      this.toastr.error(`Please enter a start valid date to your coupon`, 'Error');
      return false;
    }
    if (this.selectedCoupon.endDate == "") {
      this.toastr.error(`Please enter an expired date to your coupon`, 'Error');
      return false;
    }
    if (this.selectedCoupon.image == "") {
      this.toastr.error(`Please enter an url image to your coupon`, 'Error');
      return false;
    }
    return true;
  }

  getCompanyCoupons() {

    var token = localStorage.getItem('token');
    var url = environment.baseApiUrl + `/Company/getCompanyCoupons/${token}`;

    this._companyService.getCompanyCoupons(url).subscribe(data => {
      //console.log("data === " + data);

      this.couponsList = data;

    }, error => console.log(error))

  }


  updateCoupon() {
    if (this.checkValidInputToUpdate()) {
      var token = localStorage.getItem('token');
      var url = environment.baseApiUrl + `/Company/updateCoupon/${token}`;

      this.selectedCoupon.category = this.selectedCategory;
      this._companyService.updateCoupon(url, this.selectedCoupon).subscribe(data => {
        //console.log(data);
        this.couponsList = [];
        this.toastr.success(`Coupon ${this.selectedCoupon.title} editing was successful`, 'Success');
        this.getCompanyCoupons();
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 400) {
            this.toastr.error(`Edit Failed: ${err.error}`, 'Error');
          }
        }
      })
    }
  }


  deleteCoupon() {
    if (this.checkValidInputToDelete()) {
      var token = localStorage.getItem('token');
      var url = environment.baseApiUrl + `/Company/deleteCoupon/${token}?couponID=${this.selectedCoupon.id}`;
      //console.log(this.selectedCoupon.id);

      this._companyService.deleteCoupon(url).subscribe(data => {
        //console.log(data);
        this.couponsList = [];
        this.toastr.success(`Coupon ${this.selectedCoupon.title} deletion was successful`, 'Success');
        this.getCompanyCoupons();
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 400) {
            this.toastr.error(`Deletion Failed: ${err.error}`, 'Error');
          }
        }
      })
    }
  }



  ChooseCoupon(event) {
    this.selectedCoupon = event.value;
    //console.log(this.selectedCoupon)
  }

  ChooseCategory(event) {
    this.selectedCategory = event.value;
    //console.log(this.selectedCategory)
  }


}
