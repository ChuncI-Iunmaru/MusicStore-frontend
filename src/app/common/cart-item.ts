import {Album} from "./album";

export class CartItem {

  id: number;
  title: string;
  price: number;
  imageUrl: string

  quantity: number;

  constructor(album: Album) {
    this.id = album.albumId;
    this.title = album.albumTitle;
    this.price = album.albumPrice;
    this.imageUrl = album.imageUrl;
    this.quantity = 1
  }
}
