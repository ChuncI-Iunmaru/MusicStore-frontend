import { Injectable } from '@angular/core';
import {AlbumWrapper} from "../common/album-wrapper";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  private baseUrl: string = 'http://localhost:8080/api/rec'
  private size: number = 5;

  constructor(private httpClient: HttpClient) { }

  getTestRecommendations(albumId: number): Observable<AlbumWrapper[]> {
    return this.httpClient.get<AlbumWrapper[]>(`${this.baseUrl}/testRecommendations?id=${albumId}&size=${this.size}`);
  }

  getGenreEuclidRecommendations(albumId: number): Observable<AlbumWrapper[]> {
    return this.httpClient.get<AlbumWrapper[]>(`${this.baseUrl}/euclidGenreRecs?id=${albumId}&size=${this.size}`);
  }

  getSubgenreEuclidRecommendations(albumId: number): Observable<AlbumWrapper[]> {
    return this.httpClient.get<AlbumWrapper[]>(`${this.baseUrl}/euclidSubgenreRecs?id=${albumId}&size=${this.size}`);
  }

  getMixedRecommendations(albumId: number): Observable<AlbumWrapper[]> {
    return this.httpClient.get<AlbumWrapper[]>(`${this.baseUrl}/mixedRecs?id=${albumId}&size=${this.size}`);
  }
}
