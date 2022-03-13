import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { MinersStore, MinersState } from './miners.store';
import {interval, map, of, switchMap} from "rxjs";
import * as _L from 'lodash';
import {Miner} from "./miner.model";

@Injectable({ providedIn: 'root' })
export class MinersQuery extends QueryEntity<MinersState> {

  constructor(protected override store: MinersStore) {
    super(store);
  }
    getTopMiners() {
      const miners = this.getAll().map(miner => { return {...miner, name: miner.name.split('.')[0] }})
      const ans = _L(miners)
        .groupBy('name')
        .map((mineres, id) => ({
          id: id,
          hashrate: _L.sumBy(mineres, 'hashrate'),
          shares: _L.sumBy(mineres, 'shares'),
          hashrateString: this.getReadableHashRateString( _L.sumBy(mineres, 'hashrate'))
        }))
        .value()
      console.log(miners)
      return of(ans)
    }
  private getReadableHashRateString(hashrate:number) {
    if (hashrate < 1000000) {
      return (Math.round(hashrate / 1000) / 1000 ).toFixed(2)+' KB/s';
    }
    var byteUnits = [ ' KB/s',' MH/s', ' GH/s', ' TH/s', ' PH/s' ];
    var i = Math.floor((Math.log(hashrate/1000) / Math.log(1000)) - 1);
    hashrate = (hashrate/1000) / Math.pow(1000, i + 1);
    return hashrate.toFixed(2) + byteUnits[i];
  };

}
