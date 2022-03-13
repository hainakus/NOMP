export interface Miner {
  hasrate: any;
  name:  string;
  id: string;
  hashrateString: string;
}

export function createMiner(params: Partial<Miner>) {
  return {

  } as Miner;
}
