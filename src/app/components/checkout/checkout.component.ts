import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {StoreFormService} from "../../services/store-form.service";
import {CustomValidator} from "../../validators/custom-validator";
import {CartService} from "../../services/cart.service";
import {CheckoutService} from "../../services/checkout.service";
import {Router} from "@angular/router";
import {Order} from "../../common/order";
import {OrderItem} from "../../common/order-item";
import {Purchase} from "../../common/purchase";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  // @ts-ignore
  checkoutFormGroup: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  constructor(private formBuilder: FormBuilder,
              private formService: StoreFormService,
              private cartService: CartService,
              private checkoutService: CheckoutService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required,
          Validators.minLength(2),
          CustomValidator.notOnlyWhitespace]),
        lastName: new FormControl('', [Validators.required,
          Validators.minLength(2),
          CustomValidator.notOnlyWhitespace]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
      creditCardInformation: this.formBuilder.group({
        cardType: [''],
        nameOnCard: new FormControl('', [Validators.required,
          Validators.minLength(2),
          CustomValidator.notOnlyWhitespace]),
        cardNumber: new FormControl('', [Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16),
          Validators.pattern('^[0-9]*$')]),
        securityCode: new FormControl('', [Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
          Validators.pattern('^[0-9]*$')]),
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    const startMonth: number = new Date().getMonth() + 1;
    this.formService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Miesiące: " + JSON.stringify(data));
        this.creditCardMonths = data;
      });
    this.formService.getCreditCardYears().subscribe(
      data => {
        console.log("Lata: " + JSON.stringify(data));
        this.creditCardYears = data;
      });

    this.reviewCartDetails();
  }

  getFirstName() {
    return this.checkoutFormGroup.get('customer.firstName');
  }

  getLastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }

  getEmail() {
    return this.checkoutFormGroup.get('customer.email');
  }

  getNameOnCard() {
    return this.checkoutFormGroup.get('creditCardInformation.nameOnCard');
  }

  getCardNumber() {
    return this.checkoutFormGroup.get('creditCardInformation.cardNumber');
  }

  getSecurityCode() {
    return this.checkoutFormGroup.get('creditCardInformation.securityCode');
  }

  onSubmit() {
    console.log("Złożono zamówienie")
    console.log(this.checkoutFormGroup.get('customer')?.value)
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    const cartItems = this.cartService.cartItems;
    let orderItems: OrderItem[] = cartItems.map(tmp => new OrderItem(tmp));

    let purchase = new Purchase();
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    purchase.order = order;
    purchase.orderItems = orderItems;

    console.log(purchase);

    this.checkoutService.placeOrder(purchase).subscribe(
      {
        next: response => {
          alert(`Zamówienie złożone - kod ${response.orderTrackingNumber}. Oczekuj na email.`);
          this.resetCart();
        },
        error: err => {
          alert(`Złożenie zamówienie nie powiodło się. ${err.message}`);
        }
      });
  }

  handleMonthsAndYears() {
    const cardFormGroup = this.checkoutFormGroup.get('creditCardInformation');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(cardFormGroup?.value.expirationYear);

    let startMonth: number;
    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.formService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Miesiące: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );
  }

  private reviewCartDetails() {
    this.cartService.totalPrice.subscribe(data => {
      console.log(`obecne totalPrice=${data}`);
      this.totalPrice = data
    });
    this.cartService.totalQuantity.subscribe(data => {
      console.log(`obecne totalQuantity=${data}`);
      this.totalQuantity = data;
    });
  }

  private resetCart() {
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    this.checkoutFormGroup.reset();

    this.router.navigateByUrl("/products");
  }
}
