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
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(res => res._embedded.albums)
    );
  }
}

interface GetResponse {
  _embedded: {
    albums: Album[];
  }
}
