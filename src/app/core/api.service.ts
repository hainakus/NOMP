import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getStats() : Observable<any> {
    return this.http.get(environment.url + '/api/stats')
  }

  getStatsPool() : Observable<any> {
    return this.http.get(environment.url + '/api/global_stats')
  }

  getErgoPrice(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "X-CoinAPI-Key": "5A157120-8DB8-49B4-8A4D-1225B8F24EF4",
    })

    return this.http.get('https://rest.coinapi.io/v1/exchangerate/ERG/USD ', { headers: headers })
  }
  getWorkersStats(): Observable<any> {
    return this.http.get(environment.url + '/api/stats')
  }
}
