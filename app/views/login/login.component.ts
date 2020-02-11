import { Component } from '@angular/core';
import { LoginService } from '../../Services/login.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})

export class LoginComponent {
  constructor(private _loginService: LoginService, private router: Router, private toastr: ToastrService) {

  }
  selectedtype = "";
  email = "";
  password = "";

  types = ['Administrator', 'Customer', 'Company']


  testFunction() {
    console.log('selectedtype', this.selectedtype)
    console.log('email', this.email)
    console.log('password', this.password)

  }

  checkValidInput(): boolean {
    if(this.email=="" || !this.email.includes('@'))
    {
      this.toastr.error(`Invalid Email`, 'Error');
      return false;
    }
    if(this.password=="")
    {
      this.toastr.error(`Please enter your password`, 'Error');
      return false;
    }
    if(this.selectedtype=="")
    {
      this.toastr.error(`Please choose user type account`, 'Error');
      return false;
    }
    return true;
  }


  submitLogin() {
    if (this.checkValidInput()) {
      var stringBuilder = "";
      stringBuilder += `?email=${this.email}`;
      stringBuilder += `&password=${this.password}`;
      stringBuilder += `&type=${this.selectedtype}`;
      this._loginService.Login(stringBuilder).subscribe(data => {

        //console.log(data);
        localStorage.setItem('token', data.AccessToken);
        localStorage.setItem('type', this.selectedtype);

        this._loginService.selctedType = this.selectedtype;
        this.toastr.success(`Successfully logged in to your account`, 'Success');
        this._loginService.isLoggedIn = true;
        //console.log(this._loginService.isLoggedIn)

        this.redirectUser();
      }, err => {
        this._loginService.isLoggedIn = false;
        //console.log(this._loginService.isLoggedIn)

        if (err instanceof HttpErrorResponse) {
          if (err.status === 400) {
            this.toastr.error(`Login Failed: ${err.error}`, 'Error');
          }
        }
      })
    }
  }

  redirectUser() {
    switch (this.selectedtype) {
      case 'Administrator':
        this.router.navigate(['/admin'])
        break;
      case 'Customer':
        this.router.navigate(['/customer'])
        break;
      case 'Company':
        this.router.navigate(['/company'])
        break;
      default:
        this.router.navigate(['/login'])
        break;
    }
  }

  ChooseType(event) {
    this.selectedtype = event.value;
  }

}
