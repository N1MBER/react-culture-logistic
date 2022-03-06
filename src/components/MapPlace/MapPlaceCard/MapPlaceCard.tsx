import React, { useEffect, useState } from 'react';
import { IconMMP } from '@consta/uikit/IconMMP';
import { Text } from '@consta/uikit/Text';
import { IconClose } from '@consta/uikit/IconClose';
import { useDispatch } from 'react-redux';
import { IconCalendar } from '@consta/uikit/IconCalendar';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Place,
  PlaceEvent,
  transformWorkTimeToRus,
  WorkTime,
} from '../../../types/place';
import { Time } from '../../../types/date';
import { cn } from '../../../__private__/utils/bem';
import { setPlaceEvent } from '../../../store/reducers/placeReducer';

import './MapPlaceCard.scss';
import { MapPlaceCardWorkTime } from './MapPlaceCardWorkTime/MapPlaceCardWorkTime';
import { MapPlaceImage } from '../MapPlaceImage/MapPlaceImage';

export type MapPlaceCardProps = {
  place: Place;
  closeCard?: () => void;
  view?: 'infobox' | 'card' | 'card_short';
  onCardClick?: (place: Place) => void;
};

const cnMapPlaceCard = cn('MapPlaceCard');

const weekDayMap: Record<number, keyof WorkTime> = {
  1: 'mon',
  2: 'tue',
  3: 'wed',
  4: 'thu',
  5: 'fri',
  6: 'sat',
  7: 'sun',
};

const getDates = (workTime: WorkTime) => {
  const dates: (Date[] | null)[] = [];
  for (let i = 1; i < 8; i++) {
    const time = workTime[weekDayMap[i]];
    if (time) {
      const date_start = new Date();
      const date_end = new Date();
      const { start_time, end_time } = time;
      date_start.setHours(Number(start_time.split(':')[0]));
      date_start.setMinutes(Number(start_time.split(':')[1]));
      date_start.setSeconds(0);
      date_end.setHours(Number(end_time.split(':')[0]));
      date_end.setMinutes(Number(end_time.split(':')[1]));
      date_end.setSeconds(0);
      dates.push([date_start, date_end]);
    } else {
      dates.push(null);
    }
  }
  return dates;
};

export const checkOpen = (time: WorkTime | undefined) => {
  if (time) {
    const currentDate = new Date();
    const dates = getDates(time);
    if (dates[currentDate.getDate()]) {
      //@ts-ignore
      const start_time = dates[currentDate.getDate()][0];
      //@ts-ignore
      const end_time = dates[currentDate.getDate()][1];
      return currentDate > start_time && currentDate < end_time;
    }
    return false;
  }
  return false;
};

export const MapPlaceCard = (props: MapPlaceCardProps) => {
  const [workTime, setWorkTime] = useState<
    undefined | Record<string, Time | undefined>
  >();
  const [image, setImage] = useState<string | undefined>();

  const { place, closeCard, view = 'infobox', onCardClick } = props;

  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();

  const {
    name,
    image: placeImage,
    work_time: workTimeEn,
    description,
    gallery,
    address,
    events,
  } = place;

  useEffect(() => {
    workTimeEn && setWorkTime(transformWorkTimeToRus(workTimeEn));
  }, [workTimeEn]);

  const onClickOnPlaceEvent = (placeEvent: PlaceEvent) => {
    dispatch(setPlaceEvent({ event: placeEvent, place }));
    history.push(`${location.search}&event=${placeEvent.name}`);
  };

  const handleCardClick = () => {
    if (view === 'card_short') {
      history.push(`?place=${place.name}`);
      onCardClick?.(place);
    }
  };

  const Container = view === 'card_short' ? 'button' : 'div';
  console.log(gallery);
  return (
    <>
      <Container
        className={cnMapPlaceCard({ view })}
        onClick={handleCardClick}
        style={{
          ['--infobox-max-height' as string]: window.innerHeight * 0.65,
        }}
      >
        {view !== 'card_short' && (
          <button
            className={cnMapPlaceCard('CloseButton')}
            type="button"
            onClick={closeCard}
          >
            <IconClose size="s" />
          </button>
        )}
        <div className={cnMapPlaceCard('Title')}>
          <div
            className={cnMapPlaceCard('TitleContainer', {
              hasImage: !!placeImage,
            })}
          >
            {placeImage.image ? (
              <img
                className={cnMapPlaceCard('TitleImage')}
                src={placeImage.image}
                alt={name}
              />
            ) : (
              <IconMMP size="m" view="secondary" />
            )}
          </div>
          <Text
            className={cnMapPlaceCard('TitleText')}
            size="xl"
            as="h3"
            weight="semibold"
            view="primary"
          >
            {name}
          </Text>
        </div>
        {description && (
          <Text
            className={cnMapPlaceCard('Description')}
            weight="regular"
            size="s"
            align="left"
            as="p"
            view="primary"
          >
            {description}
          </Text>
        )}
        {address && (
          <Text
            className={cnMapPlaceCard('Address')}
            as="span"
            weight="regular"
            size="xs"
            align="left"
            view="secondary"
          >
            {address}
          </Text>
        )}
        {Array.isArray(gallery) && (
          <>
            <Text
              className={cnMapPlaceCard('GalleryText')}
              weight="semibold"
              size="s"
              align="left"
              as="p"
              view="primary"
            >
              Фотографии:
            </Text>
            <div className={cnMapPlaceCard('Gallery')}>
              {gallery.map((galeryImage, index) => (
                <div
                  onClick={() => setImage(galeryImage.image)}
                  key={`${cnMapPlaceCard('GalleryImage')}-${name}-${index}`}
                  className={cnMapPlaceCard('GalleryContainer')}
                >
                  <img
                    className={cnMapPlaceCard('GalleryImage')}
                    src={galeryImage.image}
                    alt={galeryImage.image}
                  />
                </div>
              ))}
            </div>
          </>
        )}
        {workTime && (
          <MapPlaceCardWorkTime
            isOpen={checkOpen(workTimeEn)}
            work_time={workTime}
          />
        )}
        {Array.isArray(events) && events.length > 0 && (
          <>
            <Text
              className={cnMapPlaceCard('EventsText')}
              weight="semibold"
              size="s"
              align="left"
              as="p"
              view="primary"
            >
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
                      <img alt={placeEvent.name} src={placeEvent.image.image} />
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
      </Container>
      {image && (
        <MapPlaceImage
          isOpen={!!image}
          image={image}
          changeVisible={(flag) => !flag && setImage(undefined)}
        />
      )}
    </>
  );
};
