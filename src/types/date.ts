export type Time = {
  start_time: string;
  end_time: string;
};

const getRuMonthFromDate = (date: Date, withSuffix?: boolean) => {
  switch (date.getMonth()) {
    default:
    case 0:
      return `Январ${withSuffix ? 'я' : 'ь'}`;
    case 1:
      return `Феврал${withSuffix ? 'я' : 'ь'}`;
    case 2:
      return `Март${withSuffix ? 'а' : ''}`;
    case 3:
      return `Апрел${withSuffix ? 'я' : 'ь'}`;
    case 4:
      return `Ма${withSuffix ? 'я' : 'й'}`;
    case 5:
      return `Июн${withSuffix ? 'я' : 'ь'}`;
    case 6:
      return `Июл${withSuffix ? 'я' : 'ь'}`;
    case 7:
      return `Август${withSuffix ? 'а' : ''}`;
    case 8:
      return `Сентябр${withSuffix ? 'я' : 'ь'}`;
    case 9:
      return `Октябр${withSuffix ? 'я' : 'ь'}`;
    case 10:
      return `Ноябр${withSuffix ? 'я' : 'ь'}`;
    case 11:
      return `Декабр${withSuffix ? 'я' : 'ь'}`;
  }
};

export const convertDateToString = (
  date: Date,
  withSuffix?: boolean
): string => {
  return `${date.getDate()} ${getRuMonthFromDate(
    date,
    withSuffix
  )} ${date.getFullYear()} г.`;
};

export const zeroFill = (number: number, width: number) => {
  let str = number.toString();
  for (let i = str.length; i < width; i++) str = `0${str}`;
  return str;
};

export const convertTime = (time: string) => {
  const times = time.split(':');
  return `${times[0]}:${times[1]}`;
};
