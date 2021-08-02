import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private apiUrl = "http://localhost:8080/api/stats";

  constructor(private httpClient: HttpClient) { }

  getMonthlySales(year: number): Observable<number[]>{
    console.log("Pobieranie sprzedaży na miesiąc")
    const searchUrl = `${this.apiUrl}/salesByMonth?year=${year}`;
    return this.httpClient.get<number[]>(searchUrl);
  }

  getMonthlyProfits(year: number): Observable<number[]>{
    console.log("Pobieranie zysków na miesiąc")
    const searchUrl = `${this.apiUrl}/profitsByMonth?year=${year}`;
    return this.httpClient.get<number[]>(searchUrl);
  }
}

