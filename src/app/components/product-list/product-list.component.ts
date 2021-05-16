import { Component, OnInit } from '@angular/core';
import {AlbumService} from "../../services/album.service";
import {Album} from "../../common/album";
import {CurrencyPipe} from "@angular/common";

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
  constructor(private albumService: AlbumService, private currency: CurrencyPipe) { }

  ngOnInit(): void {
    this.listProducts();
  }

  listProducts() {
    this.albumService.getAlbumList().subscribe(
      data => {
        this.albums = data;
      }
    )
  }
}
