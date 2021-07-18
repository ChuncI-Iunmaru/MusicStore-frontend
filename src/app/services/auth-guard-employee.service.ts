import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {UserDataService} from "./user-data.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardEmployeeService implements CanActivate{
  // @ts-ignore
  private isEmployee: boolean;

  constructor(private userDataService: UserDataService, public router: Router) {
    this.userDataService.getObservableStatus().subscribe(value => this.isEmployee = value);
  }

  canActivate(): boolean {
    return this.isEmployee;
  }

}
