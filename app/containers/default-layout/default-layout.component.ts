import { Component, OnInit, OnDestroy } from '@angular/core';
import { navItems } from '../../_nav';
import { LoginService } from '../../Services/login.service';
import { Router } from "@angular/router"
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.navItems.forEach(n => {
      n.class = 'hidefield';
    })
  }

  constructor(private _loginService: LoginService, private router: Router, private toastr: ToastrService) { }

  public itemsNames = [{
    role: 'Administrator',
    navNames: ['Add Company', 'Edit Companies', 'Show Companies', 'Add Customer', 'Show Customers', 'Edit Customers']
  },
  {
    role: 'Company',
    navNames: ['About Us', 'Add Coupon', 'Edit Coupon', 'Show Coupons']
  },
  {
    role: 'Customer',
    navNames: ['About Me', 'Purchase Coupons', 'Show My Coupons']
  }]
  public sidebarMinimized = false;
  public navItems = navItems;
  selectedType: string;

  ngOnInit() {
    console.log('default layout TRIGGRED')
    this.selectedType = localStorage.getItem('type');

    if (this.selectedType != null && this.selectedType != "") {
      this.filterSideNavButtons();
    }
    var isTokenExist = localStorage.getItem('token') != null && localStorage.getItem('token') != '';
    this._loginService.isLoggedIn = isTokenExist;
  }
  filterSideNavButtons() {
    var filterdItems = this.itemsNames.filter(x => {
      return x.role == this.selectedType;
    });


    if (filterdItems[0].navNames != null) {
      var filtredNavs = filterdItems[0].navNames;

      this.navItems.forEach(x => {
        if (filtredNavs.includes(x.name)) {
          if (x.name != 'Dashboard') {
            x.class = '';
          }
        }
      })
    }

  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }


  logout() {

    var token = localStorage.getItem('token');
    var url = `http://localhost:8080/Logout?accessToken=${token}`;
    this._loginService.isLoggedIn = false;
    console.log(this._loginService.isLoggedIn)

    this._loginService.Logout(url).subscribe(data => {
      console.log(data);
      this.toastr.success(`Successfully logged out`, 'Success');
      localStorage.clear();
      this.router.navigate(['/login'])
    }, error => console.log(error))
  }


  login() {

    this.router.navigate(['/login'])
  }
}

