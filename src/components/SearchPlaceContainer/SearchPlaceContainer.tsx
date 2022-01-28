import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleMap } from '../GoogleMap/GoogleMap';
import { pins } from '../../__mocks__/google.mock';
import { Place } from '../../types/place';
import { MapPlace } from '../MapPlace/MapPlace';
import { RootState } from '../../store/reducers';
import { EventBar } from '../EventBar/EventBar';
import { setPlaceEvent } from '../../store/reducers/placeReducer';

export const SearchPlaceContainer = () => {
  const [places, setPlaces] = useState<Place[]>([]);

  const placeEvent = useSelector((store: RootState) => store.place.placeEvent);

  const dispatch = useDispatch();

  useEffect(() => {
    setPlaces([...pins]);
  }, []);

  const handleClose = () => {
    dispatch(setPlaceEvent(undefined));
  };

  return (
    <GoogleMap token={process.env.REACT_APP_GOOGLE_API_KEY}>
      <EventBar
        place={placeEvent?.place}
        event={placeEvent?.event}
        isOpen={typeof placeEvent !== 'undefined'}
        closeSideBar={handleClose}
      />
      {places.map((place, index) => (
        <MapPlace place={place} key={`Marker-${index}`} />
      ))}
    </GoogleMap>
  );
};
