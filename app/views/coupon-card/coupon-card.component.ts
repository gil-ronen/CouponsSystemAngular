import { Component, OnInit, Input } from '@angular/core';
import { CustomerService } from '../../Services/customer.service';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-coupon-card',
  templateUrl: './coupon-card.component.html',
  styleUrls: ['./coupon-card.component.css']
})
export class CouponCardComponent implements OnInit {

  @Input() couponObj;
  @Input() inPurchasePage;

  constructor(private _customerService: CustomerService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  purchaseClicked() {
    console.log(this.couponObj);
    var token = localStorage.getItem('token');
    var url = environment.baseApiUrl + `/Customer/purchaseCoupon/${token}`;

    this._customerService.purchaseCoupon(url, this.couponObj).subscribe(data => {
      console.log(data);
      this.toastr.success(`Purchsed ${this.couponObj.title} successfully`, 'Success');
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 400) {
          this.toastr.error(`Purchsed Failed: ${err.error}`, 'Error');
        }
      }
    })
  }
}
