export interface WorldIDVerification {
  root: number;
  group: number;
  signal: string;
  nullifierHash: number;
  appID: string;
  actionID: string;
  proof: number[];
}
