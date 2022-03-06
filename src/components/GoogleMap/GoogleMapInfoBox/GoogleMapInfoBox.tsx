import React from 'react';
import { InfoBox } from '@react-google-maps/api';
import { Location } from '../../../types/google';

type Props = {
  children?: React.ReactNode;
  position?: Location;
  anchor?: google.maps.MVCObject;
};

export const GoogleMapInfoBox = (props: Props) => {
  const { position, children, anchor } = props;

  return (
    <InfoBox
      position={
        position
          ? {
              lat: position.coordinate_lat,
              lng: position.coordinate_lon,
            }
          : undefined
      }
      anchor={anchor}
    >
      {children}
    </InfoBox>
  );
};
