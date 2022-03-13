import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ApiService} from "./core/api.service";
import {delay, filter, interval, map, Observable, of, switchMap, tap} from "rxjs";
import * as d3 from "d3";
import {MinersService} from "./core/store/miners.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'NOMPA7';
  pool$: Observable<any>;
  ergoPrice$: Observable<any>;
  pie: any;
  colors: any[] = [];
  workers: [string, unknown][] = [];
  hashrate$: Observable<any>;
  constructor(private api:ApiService, private minersService: MinersService) {
    this.pool$ =  interval(2000).pipe(switchMap(_ => this.api.getStats().pipe(map( data => data.pools.ergo))))

    this.hashrate$ = interval(2000).pipe(switchMap(_ => this.api.getStats().pipe(map( data => data))))
    this.ergoPrice$ = interval(20000 * 3 * 15).pipe(switchMap(_ => this.api.getErgoPrice()))
    this.hashrate$.subscribe(console.log)

  }

  ngOnInit(): void {
    this.minersService.updateMiners().subscribe()
    this.ergoPrice$ =  this.api.getErgoPrice()
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    document.body.classList.toggle('dark-theme', true);

  }

  ngAfterViewInit(): void {

  }
}
