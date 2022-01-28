import React from 'react';
import { IconCalendar } from '@consta/uikit/IconCalendar';
import { Popover } from '@consta/uikit/Popover';
import { Text } from '@consta/uikit/Text';
import { PlaceEvent } from '../../../../types/place';
import { convertDateToString } from '../../../../types/date';

type Props = {
  event: PlaceEvent;
  anchorRef?: React.RefObject<HTMLElement>;
};

export const MapPlaceEvents = (props: Props) => {
  const { event, anchorRef } = props;

  const { name, startTime, endTime, galery, description, image } = event;

  return (
    <Popover anchorRef={anchorRef}>
      <div>
        {image ? (
          <img src={image} alt={name} />
        ) : (
          <div>
            <IconCalendar size="m" />
          </div>
        )}
        <Text as="h4" view="primary" weight="semibold" size="l">
          {name}
        </Text>
      </div>
      <Text as="p" view="primary" weight="regular" size="m">
        {description}
      </Text>
      <div>
        <Text as="p" view="secondary" weight="regular" size="m">
          Время проведения:
        </Text>
        <Text as="p" view="secondary" weight="regular" size="m">
          {`${startTime && `C ${convertDateToString(startTime)}`} ${
            startTime && endTime && '-'
          } ${endTime && `По ${convertDateToString(endTime)}`}`}
        </Text>
      </div>
      {Array.isArray(galery) && (
        <div>
          {galery.map((galeryImage, index) => {
            return (
              <div key={`Event-GalleryImage-${index}`}>
                <img alt={galeryImage} src={galeryImage} />
              </div>
            );
          })}
        </div>
      )}
    </Popover>
  );
};
