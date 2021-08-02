import { Component, OnInit } from '@angular/core';
import {OrderHistory} from "../../common/order-history";
import {OrderHistoryService} from "../../services/order-history.service";
import {UserDataService} from "../../services/user-data.service";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  orderHistoryList: OrderHistory[] = [];
  storage: Storage = sessionStorage;
  // @ts-ignore
  isEmployee: boolean;

  constructor(private orderHistoryService: OrderHistoryService, private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.handleOrderHistory();
    this.userDataService.getObservableStatus().subscribe(value => {
      this.isEmployee = value;
      console.log(`isEmployee = ${this.isEmployee}`)
    });
  }

  private handleOrderHistory() {
    // @ts-ignore jeżeli jestes na tej stronie, to jakiś email jest w storage
    const email = JSON.parse(this.storage.getItem('userEmail'));

    this.orderHistoryService.getOrderHistory(email).subscribe(
      data => {
        this.orderHistoryList = data._embedded.orders;
      }
    );
  }
}
