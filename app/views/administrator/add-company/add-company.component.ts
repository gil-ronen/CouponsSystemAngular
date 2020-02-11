import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Coupon } from '../../../models/CouponModel';
import { AdminService } from '../../../Services/admin.service';
import { Company } from '../../../models/CompanyModel';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  constructor(private _adminService: AdminService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  companyToAdd: any =
    {
      "id": 0,
      "name": "",
      "email": "",
      "password": "",
      "coupons": []
    };

  checkValidInput(): boolean {
    if (this.companyToAdd.name == "") {
      this.toastr.error(`Please enter company name`, 'Error');
      return false;
    }
    if (this.companyToAdd.email == "" || !this.companyToAdd.email.includes('@')) {
      this.toastr.error(`Invalid Email`, 'Error');
      return false;
    }
    if (this.companyToAdd.password == "") {
      this.toastr.error(`Please enter password`, 'Error');
      return false;
    }
    return true;
  }

  addCompany() {
    if (this.checkValidInput()) {
      console.log(this.companyToAdd);
      var token = localStorage.getItem('token');
      var url = environment.baseApiUrl + `/Admin/addCompany/${token}`;
      this._adminService.addCompany(url, this.companyToAdd).subscribe(data => {
        //console.log(data);
        this.toastr.success(`Company ${this.companyToAdd.name} added successfully`, 'Success');
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 400) {
            this.toastr.error(`Add company ${this.companyToAdd.name} Failed: ${err.error}`, 'Error');
          }
        }
      });
    }
  }
}
