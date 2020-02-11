import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  selctedType : string;
  baseApiUrl = environment.baseApiUrl;
  isLoggedIn = false;

  constructor(private _http: HttpClient) { }

  Login(paramters: string) {
    return this._http.get<any>(`${this.baseApiUrl}/Login${paramters}`);
  }

  Auth(authUrl: string) {
     return this._http.get<any>(authUrl).toPromise();
  }

  Logout(logoutUrl: string) {
    return this._http.get<string>(logoutUrl);
  }

}
