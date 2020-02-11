import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministratorRoutingModule } from './adminstrator-routing.module';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { ShowCompaniesComponent } from './show-companies/show-companies.component';
import { ShowCustomersComponent } from './show-customers/show-customers.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AlwaysAuthGuard } from '../../gurds/auth.gurd';
import { AddCompanyComponent } from './add-company/add-company.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CopunsSystemModule } from '../copuns-system/copuns-system.module';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NavigateTypeGuard } from '../../gurds/navigateTypeGurd';



@NgModule({
  declarations: [EditCompanyComponent, ShowCompaniesComponent, ShowCustomersComponent, EditCustomerComponent, AdminHomeComponent, AddCompanyComponent, AddCustomerComponent],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    MatSelectModule,
    FormsModule,
    CopunsSystemModule,
    CollapseModule.forRoot()
  ],
  providers: [AlwaysAuthGuard,NavigateTypeGuard]
})
export class AdministratorModule { }
