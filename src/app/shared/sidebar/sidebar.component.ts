import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../core/api.service";
import {interval, map, Observable, switchMap} from "rxjs";
import {MinersQuery} from "../../core/store/miners.query";
export interface worker {
  hashrate: string,
  name: string
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  workers$: any

  constructor(private api: MinersQuery) { }

  ngOnInit(): void {
    this.workers$ = interval(2000).pipe( switchMap( _ => this.api.getTopMiners()))
    this.workers$.subscribe((e: any) => console.log('********', e))
  }

}
