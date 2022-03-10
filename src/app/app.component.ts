import {Component, OnInit} from '@angular/core';
import {ApiService} from "./core/api.service";
import {map} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'NOMPA7';
  constructor(private api:ApiService) {
    this.api.getStats().pipe(map((data:any) => data.map((entry: any) => entry.pools.ergo.blocks))).subscribe(console.log)
  }

  ngOnInit(): void {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    document.body.classList.toggle('dark-theme', true);
  }
}
