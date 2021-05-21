import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Album} from "../common/album";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private baseUrl = "http://localhost:8080/api/albums";

  constructor(private httpClient: HttpClient) {
  }

  getAlbumList(): Observable<Album[]> {
    const searchUrl = this.baseUrl;
    return this.getProducts(searchUrl);
  }

  getAlbumListPaginate(thePage: number, thePageSize: number): Observable<GetResponseAlbums> {
    const searchUrl = `${this.baseUrl}?page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseAlbums>(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Album[]> {
    return this.httpClient.get<GetResponseAlbums>(searchUrl).pipe(
      map(res => res._embedded.albums)
    );
  }

  searchAlbums(theKeyword: string): Observable<Album[]> {
    console.log("Wyszukiwanie albumów")
    const searchUrl = `${this.baseUrl}/search/findByAlbumTitleContaining?title=${theKeyword}`;
    return this.getProducts(searchUrl);
  }

  searchAlbumsPaginate(theKeyword: string, thePage: number, thePageSize: number): Observable<GetResponseAlbums> {
    console.log("Wyszukiwanie albumów z paginacją")
    const searchUrl = `${this.baseUrl}/search/findByAlbumTitleContaining?title=${theKeyword}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseAlbums>(searchUrl);
  }

  getAlbum(theProductId: number): Observable<Album> {
    const albumUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Album>(albumUrl);
  }
}

interface GetResponseAlbums {
  _embedded: {
    albums: Album[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
