import React, { useEffect, useState } from 'react';
import { IconMMP } from '@consta/uikit/IconMMP';
import { Text } from '@consta/uikit/Text';
import { IconClose } from '@consta/uikit/IconClose';
import { useDispatch } from 'react-redux';
import { IconCalendar } from '@consta/uikit/IconCalendar';
import {
  Place,
  PlaceEvent,
  transformWorkTimeToRus,
} from '../../../types/place';
import { Time } from '../../../types/date';
import { cn } from '../../../__private__/utils/bem';
import { setPlaceEvent } from '../../../store/reducers/placeReducer';

import './MapPlaceCard.scss';
import { MapPlaceCardWorkTime } from './MapPlaceCardWorkTime/MapPlaceCardWorkTime';

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

  const dispatch = useDispatch();

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

  const onClickOnPlaceEvent = (placeEvent: PlaceEvent) => {
    dispatch(setPlaceEvent({ event: placeEvent, place }));
  };

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
        <>
          <Text weight="semibold" size="s" align="left" as="p" view="primary">
            Фотографии:
          </Text>
          <div className={cnMapPlaceCard('Gallery')}>
            {galery.map((galeryImage, index) => (
              <div
                key={`${cnMapPlaceCard('GalleryImage')}-${name}-${index}`}
                className={cnMapPlaceCard('GalleryContainer')}
              >
                <img
                  className={cnMapPlaceCard('GalleryImage')}
                  src={galeryImage}
                  alt={galeryImage}
                />
              </div>
            ))}
          </div>
        </>
      )}
      {workTime && <MapPlaceCardWorkTime workTime={workTime} />}
      {Array.isArray(events) && (
        <>
          <Text weight="semibold" size="s" align="left" as="p" view="primary">
            Проходящие мероприятия:
          </Text>
          <div className={cnMapPlaceCard('Events')}>
            {events.map((placeEvent, index) => (
              <button
                type="button"
                onClick={() => onClickOnPlaceEvent(placeEvent)}
                className={cnMapPlaceCard('EventContainer')}
                key={`${cnMapPlaceCard('EventContainer')}-${index}`}
              >
                <div className={cnMapPlaceCard('EventImage')}>
                  {placeEvent.image ? (
                    <img alt={placeEvent.name} src={placeEvent.image} />
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
                  {placeEvent.name}
                </Text>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
