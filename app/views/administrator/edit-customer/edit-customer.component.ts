import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../Services/admin.service';
import { environment } from '../../../../environments/environment';
import { Customer } from '../../../models/CustomerModel';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  constructor(private _adminService: AdminService, private toastr: ToastrService) { }

  ngOnInit() {
    this.showAllCustomers();
  }

  selectedCustomer: any =
    {
      "id": 0,
      "email": "",
      "firstName": "",
      "lastName": "",
      "password": "",
      "coupons": []
    };

  customersList: Customer[];

  checkValidInputUpdate(): boolean {
    if (this.selectedCustomer.id == 0) {
      this.toastr.error(`Please choose customer from the list`, 'Error');
      return false;
    }
    if (this.selectedCustomer.firstName == "") {
      this.toastr.error(`Please enter first name`, 'Error');
      return false;
    }
    if (this.selectedCustomer.lastName == "") {
      this.toastr.error(`Please enter last name`, 'Error');
      return false;
    }
    if (this.selectedCustomer.email == "" || !this.selectedCustomer.email.includes('@')) {
      this.toastr.error(`Invalid Email`, 'Error');
      return false;
    }
    if (this.selectedCustomer.password == "") {
      this.toastr.error(`Please enter password`, 'Error');
      return false;
    }
    return true;
  }

  checkValidInputDelete(): boolean {
    if (this.selectedCustomer.id == 0) {
      this.toastr.error(`Please choose customer from the list`, 'Error');
      return false;
    }
    return true;
  }

  showAllCustomers() {

    var token = localStorage.getItem('token');
    var url = environment.baseApiUrl + `/Admin/getAllCustomers/${token}`;

    this._adminService.get(url).subscribe(data => {
      // console.log(data);
      this.customersList = data;
    }, error => console.log(error))
  }

  updateCustomer() {
    if (this.checkValidInputUpdate()) {
      var token = localStorage.getItem('token');
      var url = environment.baseApiUrl + `/Admin/updateCustomer/${token}`;

      this._adminService.updateCustomer(url, this.selectedCustomer).subscribe(data => {
        //console.log(data);
        this.showAllCustomers();
        this.toastr.success(`Customer ${this.selectedCustomer.firstName} ${this.selectedCustomer.lastName} editing was successful`, 'Success');
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 400) {
            this.toastr.error(`Edit Failed: ${err.error}`, 'Error');
          }
        }
      });
    }
  }

  deleteCustomer() {
    if (this.checkValidInputDelete()) {
      var token = localStorage.getItem('token');
      var url = environment.baseApiUrl + `/Admin/deleteCustomer/${token}?customerID=${this.selectedCustomer.id}`;
      //console.log(this.selectedCustomer.id);

      this._adminService.delete(url).subscribe(data => {
        //console.log(data);
        this.showAllCustomers();
        this.toastr.success(`Customer ${this.selectedCustomer.firstName} ${this.selectedCustomer.lastName} deletion was successful`, 'Success');
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 400) {
            this.toastr.error(`Deletion Failed: ${err.error}`, 'Error');
          }
        }
      });
    }
  }

  ChooseCustomer(event) {
    this.selectedCustomer = event.value;
    //console.log(this.selectedCustomer)
  }

}
