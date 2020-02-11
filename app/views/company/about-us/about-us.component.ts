import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../Services/company.service';
import { environment } from '../../../../environments/environment';
import { Company } from '../../../models/CompanyModel';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {


  constructor(private _companyService: CompanyService) { }

  companyDeatails:Company;

  ngOnInit() {
    this.getCompanyDetails();
  }


  getCompanyDetails() {

    var token = localStorage.getItem('token');
    var url = environment.baseApiUrl + `/Company/getCompanyDetails/${token}`;

    this._companyService.getCompanyDetails(url).subscribe(data => {
      //console.log(data);
      this.companyDeatails = data;
    }, error => console.log(error))
  }


}