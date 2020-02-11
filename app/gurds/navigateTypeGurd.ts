import { CanActivate, Router, NavigationStart, NavigationEnd, ActivatedRouteSnapshot } from "@angular/router";
import { LoginService } from '../Services/login.service';
import { Injectable } from '@angular/core';
import { decimalDigest } from '@angular/compiler/src/i18n/digest';

@Injectable()
export class NavigateTypeGuard implements CanActivate {

    constructor(private _loginService: LoginService, private router: Router) {
    }


    canActivate(route: ActivatedRouteSnapshot) {
        const role = route.data.role;
        //console.log('caller', role)
        var type = localStorage.getItem('type');
        if (type == null || type == '') {
            return false;
        }
        if (role == type) {
            return true;
        }
        return false;
    }



}
