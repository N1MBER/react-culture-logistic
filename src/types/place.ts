import { Location } from './google';

export type Place = {
  name: string;
  workTime?: [Date, Date];
  coordinate: Location;
};
