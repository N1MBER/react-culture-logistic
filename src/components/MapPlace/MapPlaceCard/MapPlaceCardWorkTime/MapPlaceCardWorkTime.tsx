import React from 'react';
import { Text } from '@consta/uikit/Text';
import { Time, convertTime } from '../../../../types/date';
import { cn } from '../../../../__private__/utils/bem';

import './MapPlaceCardWorkTime.scss';

const cnMapPlaceCardWorkTime = cn('MapPlaceCardWorkTime');

export const MapPlaceCardWorkTime = (props: {
  work_time: Record<string, Time | undefined>;
  isOpen: boolean;
}) => {
  const { work_time, isOpen } = props;
  return (
    <div className={cnMapPlaceCardWorkTime()}>
      <Text weight="semibold" size="s" align="left" as="p" view="primary">
        Время работы:{' '}
        {!isOpen && (
          <Text weight="semibold" size="m" align="left" as="span" view="alert">
            Закрыто
          </Text>
        )}
      </Text>
      {Object.keys(work_time).map((key) => {
        const time = work_time[key];
        const { start_time, end_time } = time ?? ({} as Time);
        return (
          <div
            className={cnMapPlaceCardWorkTime('Container')}
            key={`${cnMapPlaceCardWorkTime('Day')}-${key}`}
          >
            <p className={cnMapPlaceCardWorkTime('Day')}>{key}</p>
            <p
              className={cnMapPlaceCardWorkTime('Time', {
                alert: !(start_time && end_time),
              })}
            >
              {start_time && end_time
                ? `${convertTime(start_time)} - ${convertTime(end_time)}`
                : 'Закрыто'}
            </p>
          </div>
        );
      })}
    </div>
  );
};
