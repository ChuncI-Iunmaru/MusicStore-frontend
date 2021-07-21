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
  private crudUrl = "http://localhost:8080/api/crud/album";

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

  getGenres(): Observable<string[]> {
    const genreUrl = `${this.crudUrl}/genreNames`;
    return this.httpClient.get<string[]>(genreUrl);
  }

  getSubgenres(): Observable<string[]> {
    const subgenreUrl = `${this.crudUrl}/subgenreNames`;
    return this.httpClient.get<string[]>(subgenreUrl);
  }

  getArtistName(theProductId: number): Observable<string> {
    const artistUrl = `${this.crudUrl}/artistNameForAlbum?id=${theProductId}`;
    return this.httpClient.get(artistUrl, {observe: 'body', responseType: "text"});
  }

  deleteAlbum(albumId: number): void {
    const deleteUrl = `${this.crudUrl}/delete?id=${albumId}`;
    console.log(`Usuwam ${deleteUrl}`)
    this.httpClient.delete(deleteUrl);
  }

  addAlbum(album: Album): Observable<number> {
    const addUrl = `${this.crudUrl}/create`
    console.log(`Dodaje ${JSON.stringify(album)}`);
    return this.httpClient.post<number>(addUrl, album);
  }

  updateAlbum(album: Album): Observable<number> {
    const updateUrl = `${this.crudUrl}/update`
    console.log(`Aktualizuje ${JSON.stringify(album)}`);
    return this.httpClient.post<number>(updateUrl, album);
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
