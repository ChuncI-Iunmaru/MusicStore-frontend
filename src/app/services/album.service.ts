import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Album} from "../common/album";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private baseUrl = "http://localhost:8080/api/albums";

  constructor(private httpClient: HttpClient) { }

  getAlbumList(): Observable<Album[]> {
    const searchUrl = this.baseUrl;
    return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Album[]> {
    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(res => res._embedded.albums)
    );
  }

  searchAlbums(theKeyword: string): Observable<Album[]> {
    console.log("Wyszukiwanie albumów")
    const searchUrl = `${this.baseUrl}/search/findByAlbumTitleContaining?title=${theKeyword}`;
    return this.getProducts(searchUrl);
  }

  getAlbum(theProductId: number): Observable<Album> {
    const albumUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Album>(albumUrl);
  }
}

interface GetResponse {
  _embedded: {
    albums: Album[];
  }
}
