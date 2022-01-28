import React, { useEffect, useState } from 'react';
import { IconMMP } from '@consta/uikit/IconMMP';
import { Text } from '@consta/uikit/Text';
import { IconClose } from '@consta/uikit/IconClose';
import { IconCalendar } from '@consta/uikit/IconCalendar';
import { Place, transformWorkTimeToRus } from '../../../../types/place';
import { Time, convertTime } from '../../../../types/date';
import { cn } from '../../../../__private__/utils/bem';

import './MapPlaceCard.scss';

type Props = {
  place: Place;
  closeCard: () => void;
};

const cnMapPlaceCard = cn('MapPlaceCard');

export const MapPlaceCard = (props: Props) => {
  const [workTime, setWorkTime] = useState<
    undefined | { [key: string]: [Time, Time] }
  >();
  const { place, closeCard } = props;

  const {
    name,
    image,
    workTime: workTimeEn,
    description,
    galery,
    address,
    events,
  } = place;

  useEffect(() => {
    workTimeEn && setWorkTime(transformWorkTimeToRus(workTimeEn));
  }, [workTimeEn]);

  return (
    <div
      className={cnMapPlaceCard()}
      style={{
        ['--infobox-max-height' as string]: window.innerHeight * 0.65,
      }}
    >
      <button
        className={cnMapPlaceCard('CloseButton')}
        type="button"
        onClick={closeCard}
      >
        <IconClose size="s" />
      </button>
      <div className={cnMapPlaceCard('Title')}>
        <div
          className={cnMapPlaceCard('TitleContainer', { hasImage: !!image })}
        >
          {image ? (
            <img
              className={cnMapPlaceCard('TitleImage')}
              src={image}
              alt={name}
            />
          ) : (
            <IconMMP size="m" view="secondary" />
          )}
        </div>
        <Text size="xl" as="h3" weight="semibold" view="primary">
          {name}
        </Text>
      </div>
      {description && (
        <Text weight="regular" size="s" align="left" as="p" view="primary">
          {description}
        </Text>
      )}
      {address && (
        <Text as="span" weight="regular" size="xs" view="secondary">
          {address}
        </Text>
      )}
      {Array.isArray(galery) && (
        <div className={cnMapPlaceCard('Gallery')}>
          {galery.map((galeryImage, index) => (
            <div className={cnMapPlaceCard('GalleryContainer')}>
              <img
                className={cnMapPlaceCard('GalleryImage')}
                src={galeryImage}
                alt={galeryImage}
                key={`GaleryImage-${name}-${index}`}
              />
            </div>
          ))}
        </div>
      )}
      {workTime && (
        <div className={cnMapPlaceCard('WorkTime')}>
          <Text weight="semibold" size="s" align="left" as="p" view="primary">
            Время работы:
          </Text>
          {Object.keys(workTime).map((key, index) => {
            const startTime = workTime[key][0];
            const endTime = workTime[key][1];
            return (
              <div
                className={cnMapPlaceCard('WorkTimeContainer')}
                key={`WorkTime-${index}`}
              >
                <p className={cnMapPlaceCard('WorkTimeDay')}>{key}</p>
                <p className={cnMapPlaceCard('WorkTimeTime')}>{`${convertTime(
                  startTime.hours,
                  startTime.minutes
                )} - ${convertTime(endTime.hours, endTime.minutes)}`}</p>
              </div>
            );
          })}
        </div>
      )}
      {Array.isArray(events) && (
        <>
          <Text weight="semibold" size="s" align="left" as="p" view="primary">
            Проходящие мероприятия:
          </Text>
          <div className={cnMapPlaceCard('Events')}>
            {events.map(({ name, image: eventImage }, index) => (
              <button
                type="button"
                className={cnMapPlaceCard('EventContainer')}
                key={`MapPlaceCardEvent-${index}`}
              >
                <div className={cnMapPlaceCard('EventImage')}>
                  {eventImage ? (
                    <img alt={name} src={eventImage} />
                  ) : (
                    <IconCalendar size="s" />
                  )}
                </div>
                <Text
                  align="left"
                  weight="semibold"
                  size="m"
                  as="p"
                  view="primary"
                >
                  {name}
                </Text>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
