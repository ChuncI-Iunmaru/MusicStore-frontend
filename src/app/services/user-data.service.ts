import {Injectable} from '@angular/core';
import {OktaAuthService} from "@okta/okta-angular";
import {BehaviorSubject, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  // @ts-ignore
  private isEmployee: BehaviorSubject<boolean>;

  constructor() {
    this.isEmployee = new BehaviorSubject<boolean>(false);
  }

  employeeLoggedIn() {
    console.log("Pracownik zalogowany")
    this.isEmployee.next(true);
  }

  employeeLoggedOut() {
    console.log("Pracownik wylogowany")
    this.isEmployee.next(false);
  }

  getObservableStatus(): Observable<boolean> {
    console.log("Zmiana statusu pracownika");
    return this.isEmployee.asObservable();
  }
}
