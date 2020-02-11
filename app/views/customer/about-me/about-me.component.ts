import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../Services/customer.service';
import { environment } from '../../../../environments/environment';
import { Customer } from '../../../models/CustomerModel';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {

  constructor(private _customerService: CustomerService) { }

  customerDeatails: Customer;

  ngOnInit() {
    this.getCustomerDetails();
  }


  getCustomerDetails() {

    var token = localStorage.getItem('token');
    var url = environment.baseApiUrl + `/Customer/getCustomerDetails/${token}`;

    this._customerService.getCustomerDetails(url).subscribe(data => {
      //console.log(data);
      this.customerDeatails = data;
    }, error => console.log(error))
  }

}
