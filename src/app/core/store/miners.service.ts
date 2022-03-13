import { Injectable } from '@angular/core';
import { NgEntityService } from '@datorama/akita-ng-entity-service';
import { MinersStore, MinersState } from './miners.store';
import {interval, map, switchMap, tap} from "rxjs";
import {ApiService} from "../api.service";
import {Miner} from "./miner.model";

@Injectable({ providedIn: 'root' })
export class MinersService {

  constructor(protected store: MinersStore, protected api: ApiService) {
  }

  updateMiners() {
   return interval(2000).pipe( switchMap( _ =>
      this.api.getStats()
        .pipe(map( data => Object.values(data.pools.ergo.workers)
          .sort( (a:any, b:any) => b.hashrate - a.hashrate)))
    ), tap( (workers: any[]) => this.store.set(workers)))
  }
}
