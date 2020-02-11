import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CommonModule } from '@angular/common';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AlwaysAuthGuard } from '../../gurds/auth.gurd';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    CollapseModule.forRoot()
  ],
  declarations: [DashboardComponent],
  providers: [AlwaysAuthGuard]
})
export class DashboardModule { }
