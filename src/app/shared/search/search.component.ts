import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../core/api.service";
import {map} from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  workers$: any;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.workers$ = this.api.getStats().pipe(map( data => Object.entries(data.pools.ergo.workers)))
    this.workers$.subscribe(console.log)
  }

}
