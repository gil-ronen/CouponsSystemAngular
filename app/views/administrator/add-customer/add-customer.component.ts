import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../Services/admin.service';
import { environment } from '../../../../environments/environment';
import { Customer } from '../../../models/CustomerModel';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  constructor(private _adminService: AdminService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  customerToAdd: Customer =
    {
      "id": 0,
      "email": "",
      "firstName": "",
      "lastName": "",
      "password": "",
      "coupons": []
    };

  checkValidInput(): boolean {
    if (this.customerToAdd.firstName == "") {
      this.toastr.error(`Please enter first name`, 'Error');
      return false;
    }
    if (this.customerToAdd.lastName == "") {
      this.toastr.error(`Please enter last name`, 'Error');
      return false;
    }
    if (this.customerToAdd.email == "" || !this.customerToAdd.email.includes('@')) {
      this.toastr.error(`Invalid Email`, 'Error');
      return false;
    }
    if (this.customerToAdd.password == "") {
      this.toastr.error(`Please enter password`, 'Error');
      return false;
    }
    return true;
  }

  addCustomer() {
    if (this.checkValidInput()) {
      var token = localStorage.getItem('token');
      var url = environment.baseApiUrl + `/Admin/addCustomer/${token}`;

      this._adminService.addCustomer(url, this.customerToAdd).subscribe(data => {
        //console.log(data);
        this.toastr.success(`Customer ${this.customerToAdd.firstName} ${this.customerToAdd.lastName} added successfully`, 'Success');
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 400) {
            this.toastr.error(`Add customer ${this.customerToAdd.firstName} ${this.customerToAdd.lastName} Failed: ${err.error}`, 'Error');
          }
        }
      });
    }
  }
}

