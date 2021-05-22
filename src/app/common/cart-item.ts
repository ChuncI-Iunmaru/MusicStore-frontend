import {Album} from "./album";

export class CartItem {

  id: number;
  title: string;
  price: number;

  quantity: number;

  constructor(album: Album) {
    this.id = album.albumId;
    this.title = album.albumTitle;
    this.price = album.albumPrice;
    this.quantity = 1
  }
}
