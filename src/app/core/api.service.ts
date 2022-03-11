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
    return this.http.get(environment.url + '/api/pool_stats')
  }
  getErgoPrice(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': 'coinranking1e0c56eb35667b5724dba93ea93384e185b0290187f8ce90'
    })

    return this.http.get('https://api.coinranking.com/v2/coins?symbols[]=ERG', { headers: headers })
  }
  getWorkersStats(): Observable<any> {
    return this.http.get(environment.url + '/api/stats')
  }
}
