import React, { useState, useCallback } from 'react';
import {
  GoogleMap as GoogleMapWrapper,
  useJsApiLoader,
} from '@react-google-maps/api';
import { cn } from '../../../__private__/utils/bem';

import './GoogleMap.scss';
import { GoogleMapType, MapType } from '../../../types/google';

const containerStyle = {
  width: window.innerWidth,
  height: window.innerHeight - 60,
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const cnGoogleMap = cn('GoogleMap');

type GoogleMapProps = {
  children?: React.ReactNode | React.ReactNode[];
  token?: string;
};

export const GoogleMap = (props: GoogleMapProps) => {
  const { children, token } = props;
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: token || '',
  });
  const [map, setMap] = useState<GoogleMapType | null>(null);
  const [mapMode, setMapMode] = useState<MapType>('roadmap');

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
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
    <div className={cnGoogleMap({ mode: mapMode })}>
      <GoogleMapWrapper
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onMapTypeIdChanged={getMapId}
      >
        {children}
      </GoogleMapWrapper>
    </div>
  ) : (
    <></>
  );
};
