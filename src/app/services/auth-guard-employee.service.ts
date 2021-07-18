import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {OktaAuthService} from "@okta/okta-angular";
import {UserDataService} from "./user-data.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardEmployeeService implements CanActivate{

  constructor(private userDataService: UserDataService, public router: Router) { }

  canActivate(): boolean {
    return this.userDataService.isEmployee;
  }

}
