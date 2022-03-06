import React from 'react';
import { Marker } from '@react-google-maps/api';
import { Location } from '../../../types/google';

type Props = {
  position: Location;
  onMarkerClick?: (position: Location) => void;
};

export const GoogleMapMarker = (props: Props) => {
  const { position, onMarkerClick } = props;

  const handleClick = (e: google.maps.MapMouseEvent) => {
    const { latLng } = e;
    latLng &&
      onMarkerClick?.({
        coordinate_lat: latLng.lat(),
        coordinate_lon: latLng.lng(),
      });
  };

  return (
    <Marker
      icon="/images/Pin.svg"
      position={{
        lat: position?.coordinate_lat,
        lng: position?.coordinate_lon,
      }}
      onClick={handleClick}
    />
  );
};
