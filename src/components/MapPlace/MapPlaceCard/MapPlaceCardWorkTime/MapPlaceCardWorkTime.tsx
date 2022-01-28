import React from 'react';
import { Text } from '@consta/uikit/Text';
import { Time, convertTime } from '../../../../types/date';
import { cn } from '../../../../__private__/utils/bem';

import './MapPlaceCardWorkTime.scss';

const cnMapPlaceCardWorkTime = cn('MapPlaceCardWorkTime');

export const MapPlaceCardWorkTime = (props: {
  workTime: { [key: string]: [Time, Time] };
}) => {
  const { workTime } = props;
  return (
    <div className={cnMapPlaceCardWorkTime()}>
      <Text weight="semibold" size="s" align="left" as="p" view="primary">
        Время работы:
      </Text>
      {Object.keys(workTime).map((key) => {
        const startTime = workTime[key][0];
        const endTime = workTime[key][1];
        return (
          <div
            className={cnMapPlaceCardWorkTime('Container')}
            key={`${cnMapPlaceCardWorkTime('Day')}-${key}`}
          >
            <p className={cnMapPlaceCardWorkTime('Day')}>{key}</p>
            <p className={cnMapPlaceCardWorkTime('Time')}>{`${convertTime(
              startTime.hours,
              startTime.minutes
            )} - ${convertTime(endTime.hours, endTime.minutes)}`}</p>
          </div>
        );
      })}
    </div>
  );
};
