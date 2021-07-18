import { Injectable } from '@angular/core';
import {OktaAuthService} from "@okta/okta-angular";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  isAuthenticated: boolean = false;
  // @ts-ignore
  isEmployee: boolean;

  constructor() {
    this.isEmployee = false;
  }

  employeeLoggedIn(){
    console.log("Pracownik zalogowany")
    this.isEmployee = true;
  }

  employeeLoggedOut(){
    console.log("Pracownik wylogowany")
    this.isEmployee = false;
  }
}
