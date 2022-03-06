import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Loader } from '@consta/uikit/Loader';
import { RootState } from '../../store/reducers';
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
import { useWindowDimensions } from '../../hooks/useWindowDimensions/useWindowDimensions';
import { setCurrentPlace } from '../../store/reducers/placeReducer';

import './PlaceBar.scss';

type ViewMode = 'search' | 'currentPlace';

type Props = {
  open: boolean;
  places: Place[];
  load?: boolean;
  onChangePlaces?: (places: Place[]) => void;
  onSearch?: (value: string) => void;
};

const cnPlaceBar = cn('PlaceBar');

export const PlaceBar = (props: Props) => {
  const { onChangePlaces, open, load, places: placesProp, onSearch } = props;

  const [visible, setVisible] = useState<boolean>(false);

  const [places, setPlaces] = useState<Place | Place[]>([]);
  const [searchParam, setSearchParam] = useState<SearchParam>({});

  const [viewMode, setViewMode] = useState<ViewMode>('search');

  const currentPlace = useSelector(
    (store: RootState) => store.place.currentPlace
  );

  const { width, height } = useWindowDimensions();

  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (typeof currentPlace !== 'undefined') {
      setPlaces(currentPlace);
      setViewMode('currentPlace');
    } else {
      setViewMode('search');
      setPlaces(placesProp);
    }
  }, [currentPlace]);

  useEffect(() => {
    setPlaces(placesProp);
  }, [placesProp.length]);

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
    dispatch(setCurrentPlace(place));
  };

  useEffect(() => {
    onChangePlaces?.(Array.isArray(places) ? places : [places]);
  }, [places]);

  const handleCloseCard = () => {
    setViewMode('search');
    if (
      location.search.includes('place') ||
      location.search.includes('events')
    ) {
      history.goBack();
    }
    dispatch(setCurrentPlace(undefined));
  };

  const cardProps: Omit<MapPlaceCardProps, 'place'> =
    viewMode === 'currentPlace'
      ? {
          view: 'card',
          closeCard: handleCloseCard,
        }
      : {
          view: 'card_short',
          onCardClick: handleCardClick,
        };

  return (
    <div
      className={cnPlaceBar({ open })}
      style={{
        ['--place-bar-width' as string]: `${
          (width || window.innerWidth) / 2
        }px`,
        ['--place-bar-margin' as string]: `-${
          (width || window.innerWidth) / 2
        }px`,
        ['--place-bar-max-height' as string]: `${
          (height || window.innerHeight) - 60
        }px`,
      }}
    >
      {visible && (
        <>
          {viewMode === 'search' && (
            <PlaceBarSearchField
              searchParam={searchParam}
              onSubmit={onSearch}
              onChange={setSearchParam}
            />
          )}
          {load ? (
            <Loader className={cnPlaceBar('Loader')} size="m" />
          ) : Array.isArray(places) ? (
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
