import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Miner } from './miner.model';

export interface MinersState extends EntityState<Miner> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'miners', idKey: 'name' })
export class MinersStore extends EntityStore<MinersState> {

  constructor() {
    super();
  }

}
