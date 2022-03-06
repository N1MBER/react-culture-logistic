import { Time } from './date';
import { Location } from './google';

type Image = { image: string };
type Galery = Image[];

export type WorkTime = {
  mon?: Time;
  tue?: Time;
  wed?: Time;
  thu?: Time;
  fri?: Time;
  sat?: Time;
  sun?: Time;
};

export const transformWorkTimeToRus = (work: WorkTime) => {
  return {
    'Пн.': work.mon,
    'Вт.': work.tue,
    'Ср.': work.wed,
    'Чт.': work.thu,
    'Пт.': work.fri,
    'Сб.': work.sat,
    'Вс.': work.sun,
  };
};

export type Place = {
  name: string;
  description?: string;
  address?: string;
  image: Image;
  work_time?: WorkTime;
  galery?: Galery;
  events?: PlaceEvent[];
} & Location;

export type PlaceEvent = {
  name: string;
  start_time?: string;
  end_time?: string;
  galery?: Galery;
  description?: string;
  image?: Image;
  price?: number;
};
