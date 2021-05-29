import {Injectable} from '@angular/core';
import {CartItem} from "../common/cart-item";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  // storage: Storage = sessionStorage;
  storage: Storage = localStorage;

  constructor() {
    // @ts-ignore
    let data = JSON.parse(this.storage.getItem('cartItems'));
    if (data != null) {
      this.cartItems = data;

      this.computeCartTotals();
    }
  }

  addToCart(cartItem: CartItem) {
    let alreadyExistInCart: boolean = false;
    // @ts-ignore
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {
      // @ts-ignore
      existingCartItem = this.cartItems.find(tmp => tmp.id === cartItem.id);
      alreadyExistInCart = (existingCartItem != undefined);
    }
    if (alreadyExistInCart) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(cartItem);
    }
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let current of this.cartItems) {
      totalPriceValue += current.quantity * current.price;
      totalQuantityValue += current.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);
    this.persistCartItems();
  }

  private logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Koszyk');
    for (let tmp of this.cartItems) {
      console.log(`${tmp.title} - ${tmp.quantity} * ${tmp.price} PLN = ${tmp.quantity * tmp.price}`);
    }
    console.log(`Razem ${totalQuantityValue} albumów za ${totalPriceValue.toFixed(2)} PLN`);
  }

  decrementQuantity(tmp: CartItem) {
    tmp.quantity--;
    if (tmp.quantity == 0) {
      this.remove(tmp);
    } else {
      this.computeCartTotals();
    }
  }

  remove(tmp: CartItem) {
    const index = this.cartItems.findIndex(item => item.id === tmp.id);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.computeCartTotals();
    }
  }

  persistCartItems() {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
}
