import React, { useState, useCallback } from 'react';
import {
  GoogleMap as GoogleMapWrapper,
  useJsApiLoader,
} from '@react-google-maps/api';
import { cn } from '../../../__private__/utils/bem';

import './GoogleMap.scss';
import { GoogleMapType, MapType, Location } from '../../../types/google';

const containerStyle = {
  width: window.innerWidth,
  height: window.innerHeight - 60,
};

const defaultCenter: Location = {
  lat: 59.9638699,
  lng: 30.2873573,
};

const cnGoogleMap = cn('GoogleMap');

type GoogleMapProps = {
  children?: React.ReactNode | React.ReactNode[];
  token?: string;
  mode?: 'main' | 'small';
  center?: Location;
  zoom?: number;
};

export const GoogleMap = (props: GoogleMapProps) => {
  const { children, token, mode, center = defaultCenter, zoom = 10 } = props;
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: token || '',
  });
  const [map, setMap] = useState<GoogleMapType | null>(null);
  const [mapMode, setMapMode] = useState<MapType>('roadmap');

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const getMapId = () => {
    if (map) {
      //@ts-ignore
      setMapMode(map.mapTypeId as MapType);
    }
  };

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div className={cnGoogleMap({ mapMode, mode })}>
      <GoogleMapWrapper
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onMapTypeIdChanged={getMapId}
        mapTypeId="roadmap"
      >
        {children}
      </GoogleMapWrapper>
    </div>
  ) : (
    <></>
  );
};
