import React, { useState } from 'react';
import { GoogleMapMarker } from '../GoogleMap/GoogleMapMarker/GoogleMapMarker';
import { GoogleMapInfoBox } from '../GoogleMap/GoogleMapInfoBox/GoogleMapInfoBox';
import { Place } from '../../../types/place';

type Props = {
  place: Place;
};

export const MapPlace = (props: Props) => {
  const { place } = props;

  const { name, workTime, coordinate } = place;
  const [visibleCard, setVisibleCard] = useState<boolean>(false);

  return (
    <>
      <GoogleMapMarker
        position={coordinate}
        onMarkerClick={() => setVisibleCard(!visibleCard)}
      />
      {visibleCard && (
        <GoogleMapInfoBox position={coordinate}>
          <p>{name}</p>
        </GoogleMapInfoBox>
      )}
    </>
  );
};
