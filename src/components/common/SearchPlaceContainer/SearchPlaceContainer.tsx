import React, { useState } from 'react';
import { GoogleMap } from '../GoogleMap/GoogleMap';
import { pins } from '../../../__mocks__/google.mock';
import { Place } from '../../../types/place';
import { MapPlace } from '../MapPlace/MapPlace';

export const SearchPlaceContainer = () => {
  const [places, setPlaces] = useState<Place[]>([...pins]);

  return (
    <GoogleMap token={process.env.REACT_APP_GOOGLE_API_KEY}>
      {places.map((place, index) => (
        <MapPlace place={place} key={`Marker-${index}`} />
      ))}
    </GoogleMap>
  );
};
