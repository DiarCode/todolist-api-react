import {IToWatch} from "./towatch.type"

export interface IToWatchCategory {
  id: number;
  value: string;
  color: string;
  towatches: IToWatch[]
}
