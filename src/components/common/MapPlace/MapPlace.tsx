import React, { useState } from 'react';
import { GoogleMapMarker } from '../GoogleMap/GoogleMapMarker/GoogleMapMarker';
import { GoogleMapInfoBox } from '../GoogleMap/GoogleMapInfoBox/GoogleMapInfoBox';
import { Place } from '../../../types/place';
import { MapPlaceCard } from './MapPlaceCard/MapPlaceCard';

type Props = {
  place: Place;
};

export const MapPlace = (props: Props) => {
  const { place } = props;

  const { coordinate } = place;
  const [visibleCard, setVisibleCard] = useState<boolean>(true);

  return (
    <>
      <GoogleMapMarker
        position={coordinate}
        onMarkerClick={() => setVisibleCard(!visibleCard)}
      />
      {visibleCard && (
        <GoogleMapInfoBox position={coordinate}>
          <MapPlaceCard closeCard={() => setVisibleCard(false)} place={place} />
        </GoogleMapInfoBox>
      )}
    </>
  );
};
