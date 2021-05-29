import { Component, OnInit } from '@angular/core';
import {OktaAuthService} from "@okta/okta-angular";

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  // @ts-ignore
  userFullName: string;

  constructor(private oktaAuthService: OktaAuthService) { }

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
        });
    }
  }

  logout() {
    this.oktaAuthService.signOut();
  }
}
