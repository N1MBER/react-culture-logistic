import React, { useState } from 'react';
import { GoogleMap } from '../GoogleMap/GoogleMap';
import { pins } from '../../../__mocks__/google.mock';
import { Place } from '../../../types/place';
import { GoogleMapMarker } from '../GoogleMap/GoogleMapMarker/GoogleMapMarker';

export const SearchPlaceContainer = () => {
  const [places, setPlaces] = useState<Place[]>([...pins]);

  return (
    <GoogleMap token={process.env.REACT_APP_GOOGLE_API_KEY}>
      {places.map((place, index) => (
        <GoogleMapMarker position={place.coordinate} key={`Marker-${index}`} />
      ))}
    </GoogleMap>
  );
};
