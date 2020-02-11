import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { ShowCompaniesComponent } from './show-companies/show-companies.component';
import { ShowCustomersComponent } from './show-customers/show-customers.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AlwaysAuthGuard } from '../../gurds/auth.gurd';
import { AddCompanyComponent } from './add-company/add-company.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NavigateTypeGuard } from '../../gurds/navigateTypeGurd';
 
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'add-company',
    component: AddCompanyComponent,
    data: {
      title: 'Add Company',
      role : 'Administrator'
    },
    canActivate: [AlwaysAuthGuard,NavigateTypeGuard],

  },
  {
    path: 'show-companies',
    component: ShowCompaniesComponent,
    data: {
      title: 'Show Companies',
      role : 'Administrator'
    },
    canActivate: [AlwaysAuthGuard,NavigateTypeGuard]
  },
  {
    path: 'edit-companies',
    component: EditCompanyComponent,
    data: {
      title: 'Edit Companies',
      role : 'Administrator'
    },
    canActivate: [AlwaysAuthGuard,NavigateTypeGuard]
  },
  {
    path: 'add-customer',
    component: AddCustomerComponent,
    data: {
      title: 'Add Customer',
      role : 'Administrator'
    },
    canActivate: [AlwaysAuthGuard,NavigateTypeGuard]
  },
  {
    path: 'show-customers',
    component: ShowCustomersComponent,
    data: {
      title: 'Show Customers',
      role : 'Administrator'
    },
    canActivate: [AlwaysAuthGuard,NavigateTypeGuard]
  },
  {
    path: 'edit-customers',
    component: EditCustomerComponent,
    data: {
      title: 'Edit Customers',
      role : 'Administrator'
    },
    canActivate: [AlwaysAuthGuard,NavigateTypeGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
