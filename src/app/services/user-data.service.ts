import {Injectable} from '@angular/core';
import {OktaAuthService} from "@okta/okta-angular";
import {BehaviorSubject, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  // @ts-ignore
  private isEmployee: BehaviorSubject<boolean>;

  private currentUserId: BehaviorSubject<number>;

  private baseUrl = "http://localhost:8080/api/customers";

  constructor(private httpClient: HttpClient) {
    this.isEmployee = new BehaviorSubject<boolean>(false);
    this.currentUserId = new BehaviorSubject<number>(-1);
  }

  employeeLoggedIn() {
    console.log("Pracownik zalogowany");
    this.isEmployee.next(true);
  }

  employeeLoggedOut() {
    console.log("Pracownik wylogowany");
    this.isEmployee.next(false);
  }

  customerSwitch(newId: number){
    console.log("Zmiana zalogowanego użytkownika na " + newId);
    this.currentUserId.next(newId);
  }

  getObservableStatus(): Observable<boolean> {
    console.log("Zmiana statusu pracownika");
    return this.isEmployee.asObservable();
  }

  getObservableCurrentId(): Observable<number> {
    console.log("Zmiana aktualnie zalogowanego id");
    return this.currentUserId.asObservable();
  }

  getUserIdByEmail(email: string): Observable<number> {
    const searchUrl = `${this.baseUrl}/search/findFirstByEmail?email=${email}`;
    console.log("Wyszukiwanie id klienta o emailu " + email);
    return this.httpClient.get<UserIdOnly>(searchUrl).pipe(
      map(res => res.id)
    );
  }
}

interface UserIdOnly{
  id: number;
}
