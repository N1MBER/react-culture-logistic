import React, { useEffect, useState } from 'react';
import { IconCalendar } from '@consta/uikit/IconCalendar';
import { Text } from '@consta/uikit/Text';
import {
  Place,
  PlaceEvent,
  transformWorkTimeToRus,
} from '../../../types/place';
import { convertDateToString, Time } from '../../../types/date';
import { cn } from '../../../__private__/utils/bem';

import './MapPlaceEvents.scss';
import { MapPlaceCardWorkTime } from '../MapPlaceCard/MapPlaceCardWorkTime/MapPlaceCardWorkTime';
import { checkOpen } from '../MapPlaceCard/MapPlaceCard';
import { MapPlaceImage } from '../MapPlaceImage/MapPlaceImage';

type Props = {
  event: PlaceEvent;
  place?: Place;
};

const cnMapPlaceEvents = cn('MapPlaceEvents');

export const MapPlaceEvents = (props: Props) => {
  const { event, place: eventPlace } = props;
  const [image, setImage] = useState<string | undefined>();

  const [workTime, setWorkTime] = useState<
    undefined | Record<string, Time | undefined>
  >();

  const {
    name,
    start_time,
    end_time,
    gallery,
    description,
    image: placeImage,
  } = event;

  const place = eventPlace || ({} as Place);

  const { name: placeName, work_time: workTimeEn, address } = place;

  useEffect(() => {
    workTimeEn && setWorkTime(transformWorkTimeToRus(workTimeEn));
  }, [workTimeEn]);

  return (
    <>
      <div className={cnMapPlaceEvents()}>
        <div className={cnMapPlaceEvents('Title')}>
          <div
            className={cnMapPlaceEvents('TitleImageContainer', {
              hasImage: !!placeImage,
            })}
          >
            {image ? (
              <img
                className={cnMapPlaceEvents('TitleImage')}
                src={placeImage?.image}
                alt={name}
              />
            ) : (
              <IconCalendar size="m" />
            )}
          </div>
          <Text align="left" as="h3" view="primary" weight="semibold" size="xl">
            {name}
          </Text>
        </div>
        <Text as="p" view="primary" weight="regular" size="m">
          {description}
        </Text>
        <div className={cnMapPlaceEvents('TimeBlock')}>
          <Text weight="semibold" size="s" align="left" as="p" view="primary">
            Время проведения:
          </Text>
          <Text as="p" view="secondary" weight="regular" size="m">
            {`${
              start_time &&
              `C ${convertDateToString(new Date(start_time), true)}`
            } ${start_time && end_time && '-'} ${
              end_time && `По ${convertDateToString(new Date(end_time), true)}`
            }`}
          </Text>
        </div>
        {Array.isArray(gallery) && (
          <>
            <Text weight="semibold" size="s" align="left" as="p" view="primary">
              Фотографии:
            </Text>
            <div className={cnMapPlaceEvents('Gallery')}>
              {gallery.map((galeryImage, index) => {
                return (
                  <div
                    onClick={() => setImage(galeryImage.image)}
                    className={cnMapPlaceEvents('GalleryImageContainer')}
                    key={`Event-GalleryImage-${index}`}
                  >
                    <img
                      className={cnMapPlaceEvents('GalleryImage')}
                      alt={galeryImage.image}
                      src={galeryImage.image}
                    />
                  </div>
                );
              })}
            </div>
          </>
        )}
        {placeName && (
          <Text weight="regular" size="s" align="left" as="p" view="primary">
            Место проведения мероприятия: <b>{placeName}</b>
          </Text>
        )}
        {address && (
          <Text as="span" weight="regular" size="xs" view="secondary">
            {address}
          </Text>
        )}
        {workTime && (
          <MapPlaceCardWorkTime
            isOpen={checkOpen(workTimeEn)}
            work_time={workTime}
          />
        )}
      </div>
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
