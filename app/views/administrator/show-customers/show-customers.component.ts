import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../Services/admin.service';
import { environment } from '../../../../environments/environment';
import { Customer } from '../../../models/CustomerModel';

@Component({
  selector: 'app-show-customers',
  templateUrl: './show-customers.component.html',
  styleUrls: ['./show-customers.component.css']
})
export class ShowCustomersComponent implements OnInit {

  customers: Customer[];
  customersListStatic: Customer[];
  selectedCustomer:Customer;

  constructor(private _adminService: AdminService) { }

  ngOnInit() {
    this.showAllCustomers();
  }

  showOneCustomer() {

    var token = localStorage.getItem('token');
    var url = environment.baseApiUrl + `/Admin/getOneCustomer/${token}?customerID=${this.selectedCustomer.id}`;

    //console.log(this.selectedCustomer.id);

    this._adminService.get(url).subscribe(data => {
      //console.log(data);
      this.selectedCustomer = data;
      this.customers= [];
      this.customers.push(this.selectedCustomer);
    }, error => console.log(error))
  }

  showAllCustomers() {

    var token = localStorage.getItem('token');
    var url = environment.baseApiUrl + `/Admin/getAllCustomers/${token}`;

    this._adminService.get(url).subscribe(data => {
      //console.log(data);
      this.customers = data;
      this.customersListStatic = data;
    }, error => console.log(error))
  }

  ChooseCustomer(event) {
    this.selectedCustomer = event.value;
    this.showOneCustomer();
  }

}
