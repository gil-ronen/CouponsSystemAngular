import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../Services/admin.service';
import { environment } from '../../../../environments/environment';
import { Company } from '../../../models/CompanyModel';

@Component({
  selector: 'app-show-companies',
  templateUrl: './show-companies.component.html',
  styleUrls: ['./show-companies.component.css']
})
export class ShowCompaniesComponent implements OnInit {

  companies: Company[];
  companiesListStatic: Company[];
  selectedCompany:Company;

  constructor(private _adminService: AdminService) { }

  ngOnInit() {
    this.showAllCompanies();
  }

  showOneCompany() {

    var token = localStorage.getItem('token');
    var url = environment.baseApiUrl + `/Admin/getOneCompany/${token}?companyID=${this.selectedCompany.id}`;

    this._adminService.get(url).subscribe(data => {
      //console.log(data);
      this.selectedCompany = data;
      this.companies= [];
      this.companies.push(this.selectedCompany);
    }, error => console.log(error))
  }

  showAllCompanies() {

    var token = localStorage.getItem('token');
    var url = environment.baseApiUrl + `/Admin/getAllCompanies/${token}`;

    this._adminService.get(url).subscribe(data => {
     // console.log(data);
      this.companies = data;
      this.companiesListStatic = data;
    }, error => console.log(error))
  }

  ChooseCompany(event) {
    this.selectedCompany = event.value;
    this.showOneCompany();
  }

}
