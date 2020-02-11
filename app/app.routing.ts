import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { LoginComponent } from './views/login/login.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [

      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  },
  {
    path: 'admin',
    component: DefaultLayoutComponent,
    data: {
      title: 'Admin'
    },
 
    children: [

      {
        path: '',
        loadChildren: () => import('./views/administrator/administrator.module').then(m => m.AdministratorModule)
      }
    ]
  },
  {
    path: 'customer',
    component: DefaultLayoutComponent,
    data: {
      title: 'Customer'
    },
  
    children: [

      {
        path: '',
        loadChildren: () => import('./views/customer/customer.module').then(m => m.CustomerModule)
      }
    ]
  },
  {
    path: 'company',
    component: DefaultLayoutComponent,
    data: {
      title: 'Company'
    },

    children: [

      {
        path: '',
        loadChildren: () => import('./views/company/company.module').then(m => m.CompanyModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
