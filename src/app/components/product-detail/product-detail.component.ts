import { Component, OnInit } from '@angular/core';
import {Album} from "../../common/album";
import {AlbumService} from "../../services/album.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  // @ts-ignore
  album: Album = new Album();
  constructor(private albumService: AlbumService, private route: ActivatedRoute) { }

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

}
