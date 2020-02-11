import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../Services/login.service';
import { AdminService } from '../../../Services/admin.service';
import { environment } from '../../../../environments/environment';
import { Company } from '../../../models/CompanyModel';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-editcompany',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {

  constructor(private _adminService: AdminService, private toastr: ToastrService) { }

  ngOnInit() {
    this.showAllCompanies();
  }

  selectedCompany: any =
    {
      "id": 0,
      "name": "",
      "email": "",
      "password": "",
      "coupons": []
    };

  companiesList: Company[];


  checkValidInputUpdate(): boolean {
    if (this.selectedCompany.id == 0) {
      this.toastr.error(`Please choose company from the list`, 'Error');
      return false;
    }
    if (this.selectedCompany.name == "") {
      this.toastr.error(`Please enter company name`, 'Error');
      return false;
    }
    if (this.selectedCompany.email == "" || !this.selectedCompany.email.includes('@')) {
      this.toastr.error(`Invalid Email`, 'Error');
      return false;
    }
    if (this.selectedCompany.password == "") {
      this.toastr.error(`Please enter password`, 'Error');
      return false;
    }
    return true;
  }

  checkValidInputDelete(): boolean {
    if (this.selectedCompany.id == 0) {
      this.toastr.error(`Please choose customer from the list`, 'Error');
      return false;
    }
    return true;
  }

  showAllCompanies() {

    var token = localStorage.getItem('token');
    var url = environment.baseApiUrl + `/Admin/getAllCompanies/${token}`;

    this._adminService.get(url).subscribe(data => {
      //console.log(data);
      this.companiesList = data;
    }, error => console.log(error))

  }


  updateCompany() {
    if (this.checkValidInputUpdate()) {
      var token = localStorage.getItem('token');
      var url = environment.baseApiUrl + `/Admin/updateCompany/${token}`;

      this._adminService.updateCompany(url, this.selectedCompany).subscribe(data => {
        //console.log(data);
        this.showAllCompanies();
        this.toastr.success(`Company ${this.selectedCompany.name} editing was successful`, 'Success');
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 400) {
            this.toastr.error(`Edit Failed: ${err.error}`, 'Error');
          }
        }
      });
    }
  }

  deleteCompany() {
    if (this.checkValidInputDelete()) {
      var token = localStorage.getItem('token');
      var url = environment.baseApiUrl + `/Admin/deleteCompany/${token}?companyID=${this.selectedCompany.id}`;
      //console.log(this.selectedCompany.id);

      this._adminService.delete(url).subscribe(data => {
        //console.log(data);
        this.showAllCompanies();
        this.toastr.success(`Company ${this.selectedCompany.name} deletion was successful`, 'Success');
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 400) {
            this.toastr.error(`Deletion Failed: ${err.error}`, 'Error');
          }
        }
      });
    }
  }


  ChooseCompany(event) {
    this.selectedCompany = event.value;
    //console.log(this.selectedCompany)
  }


}
