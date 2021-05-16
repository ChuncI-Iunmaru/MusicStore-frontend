import { Component, OnInit } from '@angular/core';
import {AlbumService} from "../../services/album.service";
import {Album} from "../../common/album";
import {CurrencyPipe} from "@angular/common";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-list',
  // templateUrl: './product-list.component.html',
  // templateUrl: './product-list-table.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  // @ts-ignore
  albums: Album[];
  // @ts-ignore
  searchMode: boolean;

  constructor(private albumService: AlbumService, private currency: CurrencyPipe, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
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
    this.albumService.searchAlbums(theKeyword).subscribe(
      data => {
        this.albums = data;
      }
    )
  }

  handleListProducts() {
    this.albumService.getAlbumList().subscribe(
      data => {
        this.albums = data;
      }
    )
  }
}
