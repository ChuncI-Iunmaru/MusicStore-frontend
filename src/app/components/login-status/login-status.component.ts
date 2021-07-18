import { Component, OnInit } from '@angular/core';
import {OktaAuthService} from "@okta/okta-angular";
import {UserDataService} from "../../services/user-data.service";

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  // @ts-ignore
  userFullName: string;
  // @ts-ignore
  isEmployee: boolean;

  storage: Storage = sessionStorage;

  constructor(private oktaAuthService: OktaAuthService, private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.oktaAuthService.$authenticationState.subscribe(
      (result) => {
        this.isAuthenticated = result;
        this.getUserDetails();
      });
  }

  private getUserDetails() {
    if (this.isAuthenticated) {
      this.oktaAuthService.getUser().then(
        (res) => {
          // @ts-ignore
          this.userFullName = res.name;

          const email = res.email;
          console.log(res)
          this.storage.setItem('userEmail', JSON.stringify(email));
          const role = res.Groups.find((group: string) => group === 'Pracownik');
          if (role === 'Pracownik') {
            this.userDataService.employeeLoggedIn();
            this.isEmployee = true;
          } else {
            this.userDataService.employeeLoggedOut()
            this.isEmployee = false;
          }
        });
    }
  }

  logout() {
    this.oktaAuthService.signOut();
    this.userDataService.employeeLoggedOut();
  }
}
