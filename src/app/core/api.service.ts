import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getStats() : Observable<any> {
    return this.http.get(environment.url + '/api/pool_stats')
  }
  getErgoPrice(): Observable<any> {
    return this.http.get('https://coinranking.com/api/v2/coin/rfIHB4cXI/markets?offset=0&referenceCurrencyUuid=yhjMzLPhuIDl&limit=5')
  }
  getWorkersStats(): Observable<any> {
    return this.http.get(environment.url + '/api/stats')
  }
}
