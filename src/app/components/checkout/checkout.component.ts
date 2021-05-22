import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {StoreFormService} from "../../services/store-form.service";
import {CustomValidator} from "../../validators/custom-validator";

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

  constructor(private formBuilder: FormBuilder, private formService: StoreFormService) {
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
      }
    );
    this.formService.getCreditCardYears().subscribe(
      data => {
        console.log("Lata: " + JSON.stringify(data));
        this.creditCardYears = data;
      }
    )
  }

  getFirstName() {return this.checkoutFormGroup.get('customer.firstName');}
  getLastName() {return this.checkoutFormGroup.get('customer.lastName');}
  getEmail() {return this.checkoutFormGroup.get('customer.email');}

  getNameOnCard() {return this.checkoutFormGroup.get('creditCardInformation.nameOnCard');}
  getCardNumber() {return this.checkoutFormGroup.get('creditCardInformation.cardNumber');}
  getSecurityCode() {return this.checkoutFormGroup.get('creditCardInformation.securityCode');}

  onSubmit() {
    console.log("Złożono zamówienie")
    console.log(this.checkoutFormGroup.get('customer')?.value)
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }
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
}
