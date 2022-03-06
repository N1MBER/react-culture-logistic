import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { GoogleMap } from '../GoogleMap/GoogleMap';
import { Place } from '../../types/place';
import { MapPlace } from '../MapPlace/MapPlace';
import { RootState } from '../../store/reducers';
import { EventBar } from '../EventBar/EventBar';
import { setPlaceEvent } from '../../store/reducers/placeReducer';
import { PlaceBar } from '../PlaceBar/PlaceBar';
import { cn } from '../../__private__/utils/bem';

import './SearchPlaceContainer.scss';
import { useRequests } from '../../hooks/useRequests/useRequests';

const cnSearchPlaceContainer = cn('SearchPlaceContainer');

export const SearchPlaceContainer = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [load, setLoad] = useState<boolean>(false);

  const placeEvent = useSelector((store: RootState) => store.place.placeEvent);

  const viewMode = useSelector((store: RootState) => store.settings.viewMode);

  const dispatch = useDispatch();
  const history = useHistory();

  const { getPlaces } = useRequests();

  const getData = () => {
    getPlaces()
      .then((res) => {
        setPlaces(res.data as Place[]);
        setLoad(false);
      })
      .catch(() => {
        setLoad(false);
      });
  };

  useEffect(() => {
    getData();
    setLoad(true);
  }, []);

  const handleClose = () => {
    dispatch(setPlaceEvent(undefined));
    history.goBack();
  };

  const search = (value: string) => {
    getPlaces(value).then((res) => {
      console.log(res);
      setPlaces(res.data as Place[]);
    });
  };

  return (
    <div className={cnSearchPlaceContainer({ viewMode })}>
      <PlaceBar
        places={places}
        onChangePlaces={setPlaces}
        onSearch={search}
        load={load}
        open={viewMode === 'sidebar'}
      />
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
    </div>
  );
};
