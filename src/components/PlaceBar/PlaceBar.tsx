import React, { useState, useEffect } from 'react';
import { Place } from '../../types/place';
import { cn } from '../../__private__/utils/bem';
import {
  MapPlaceCard,
  MapPlaceCardProps,
} from '../MapPlace/MapPlaceCard/MapPlaceCard';
import {
  PlaceBarSearchField,
  SearchParam,
} from './PlaceBarSearchField/PlaceBarSearchField';
import { pins } from '../../__mocks__/google.mock';

import './PlaceBar.scss';

type ViewMode = 'search' | 'currentPlace';

type Props = {
  open: boolean;
  onChangePlaces?: (places: Place[]) => void;
};

const cnPlaceBar = cn('PlaceBar');

export const PlaceBar = (props: Props) => {
  const { onChangePlaces, open } = props;

  const [visible, setVisible] = useState<boolean>(false);

  const [places, setPlaces] = useState<Place | Place[]>([]);
  const [searchParam, setSearchParam] = useState<SearchParam>({});

  const [viewMode, setViewMode] = useState<ViewMode>('search');

  useEffect(() => {
    if (open) {
      setVisible(true);
    } else {
      setTimeout(() => {
        setVisible(false);
      }, 500);
    }
  }, [open]);

  const handleCardClick = (place: Place) => {
    setViewMode('currentPlace');
    setPlaces(place);
  };

  useEffect(() => {
    setPlaces([...pins]);
  }, []);

  useEffect(() => {
    onChangePlaces?.(Array.isArray(places) ? places : [places]);
  }, [places]);

  const cardProps: Omit<MapPlaceCardProps, 'place'> =
    viewMode === 'currentPlace'
      ? {
          view: 'card',
          closeCard: () => setViewMode('search'),
        }
      : {
          view: 'card_short',
          onCardClick: handleCardClick,
        };

  return (
    <div
      className={cnPlaceBar({ open })}
      style={{
        ['--place-bar-width' as string]: `${window.innerWidth / 2}px`,
        ['--place-bar-margin' as string]: `-${window.innerWidth / 2}px`,
      }}
    >
      {visible && (
        <>
          {viewMode === 'search' && (
            <PlaceBarSearchField
              searchParam={searchParam}
              onChange={setSearchParam}
            />
          )}
          {Array.isArray(places) ? (
            places.map((place, index) => (
              <MapPlaceCard
                place={place}
                key={cnPlaceBar(`PlaceCard-${index}`)}
                {...cardProps}
              />
            ))
          ) : (
            <MapPlaceCard place={places} {...cardProps} />
          )}
        </>
      )}
    </div>
  );
};
