import {CartItem} from "./cart-item";

export class OrderItem {
  imageUrl: string;
  unitPrice: number;
  quantity: number;
  productId: number;

  constructor(cartItem: CartItem) {
    this.imageUrl = "";
    this.quantity = cartItem.quantity;
    this.unitPrice = cartItem.price;
    this.productId = cartItem.id;
  }
}
