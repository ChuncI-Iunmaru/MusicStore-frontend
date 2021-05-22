import { Component, OnInit } from '@angular/core';
import {Album} from "../../common/album";
import {AlbumService} from "../../services/album.service";
import {ActivatedRoute} from "@angular/router";
import {CartService} from "../../services/cart.service";
import {CartItem} from "../../common/cart-item";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  // @ts-ignore
  album: Album = new Album();
  constructor(private albumService: AlbumService, private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  handleProductDetails() {
    // @ts-ignore
    const theProductId: number = +this.route.snapshot.paramMap.get('id');

    this.albumService.getAlbum(theProductId).subscribe(
      data => {
        this.album = data;
      }
    )
  }

  addToCart() {
    console.log(`albumTitle=${this.album.albumTitle}, price=${this.album.albumPrice}`);
    const cartItem = new CartItem(this.album);
    this.cartService.addToCart(cartItem);
  }
}
