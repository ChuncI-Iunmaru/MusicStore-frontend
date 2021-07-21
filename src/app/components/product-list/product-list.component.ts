import {Component, OnInit} from '@angular/core';
import {AlbumService} from "../../services/album.service";
import {Album} from "../../common/album";
import {CurrencyPipe} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {CartItem} from "../../common/cart-item";
import {CartService} from "../../services/cart.service";
import {UserDataService} from "../../services/user-data.service";

@Component({
  selector: 'app-product-list',
  // templateUrl: './product-list.component.html',
  // templateUrl: './product-list-table.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  albums: Album[] = [];
  searchMode: boolean = false;

  thePageNumber: number = 1;
  thePageSize: number = 20;
  theTotalElements: number = 0;

  // @ts-ignore
  previousKeyword: string = null

  // @ts-ignore
  isEmployee: boolean;

  constructor(private albumService: AlbumService,
              private currency: CurrencyPipe,
              private route: ActivatedRoute,
              private cartService: CartService,
              private userDataService: UserDataService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
    this.userDataService.getObservableStatus().subscribe(value => {
      this.isEmployee = value;
      console.log(`isEmployee = ${this.isEmployee}`)
    });
  }

  listProducts() {
    console.log("list products")
    console.log(this.route.snapshot.paramMap.has('keyword'));
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else this.handleListProducts();
  }

  handleSearchProducts() {
    // Keyword będzie i tak jak dojdzie do tej metody
    // @ts-ignore
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');

    if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);

    this.albumService.searchAlbumsPaginate(theKeyword, this.thePageNumber - 1, this.thePageSize).subscribe(this.processResult());
  }

  handleListProducts() {
    this.albumService.getAlbumListPaginate(this.thePageNumber - 1, this.thePageSize).subscribe(this.processResult());
  }

  processResult() {
    // @ts-ignore
    return data => {
      this.albums = data._embedded.albums;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    }
  }

  addToCart(album: Album) {
    console.log(`albumTitle=${album.albumTitle}, price=${album.albumPrice}`);
    const cartItem = new CartItem(album);
    this.cartService.addToCart(cartItem);
  }

  deleteAlbum(id: number){
    this.albumService.deleteAlbum(id).subscribe(result => {
      console.log('Usunięto album ' + result);
      this.listProducts();
    })
  }
}
