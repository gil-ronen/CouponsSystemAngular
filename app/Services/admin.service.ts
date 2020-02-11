import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Company } from '../models/CompanyModel';
import { Customer } from '../models/CustomerModel';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http: HttpClient) { }


  addCompany(url: string, company: Company) {
    return this._http.post<any>(url, company);
  }

  addCustomer(url: string, customer: Customer) {
    return this._http.post<any>(url, customer);
  }

  updateCompany(url: string, company: Company) {
    return this._http.put<any>(url, company);
  }

  updateCustomer(url: string, customer: Customer) {
    return this._http.put<any>(url, customer);
  }

  delete(url: string) {
    return this._http.delete<any>(url);
  }

  get(url: string) {
    return this._http.get<any>(url);
  }

}
