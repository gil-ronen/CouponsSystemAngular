import { CanActivate, Router } from "@angular/router";
import { LoginService } from '../Services/login.service';
import { Injectable } from '@angular/core';
import { promise } from 'protractor';

@Injectable()
export class AlwaysAuthGuard implements CanActivate {

    constructor(private _loginService: LoginService, private router: Router) {
    }
    async canActivate(): Promise<boolean> {
        var token = localStorage.getItem('token');
        var url = `http://localhost:8080/Auth?accessToken=${token}`;
        var result: boolean = false;
        var isAuthenticate = await this._loginService.Auth(url).then(data => {
            //console.log('GURD RESULT', data['authorized']);
            if (!data['authorized']) {
                localStorage.removeItem('token');
                localStorage.removeItem('type');
                this.router.navigate(['/login'])
            }
            return data['authorized'];
        });
        return isAuthenticate;
    }
}
