import React from 'react';
import { cn } from '../../../__private__/utils/bem';
import { GoogleMap } from '../../common/GoogleMap/GoogleMap';

const cnMainPage = cn('MainPage');

export const MainPage = () => {
  return (
    <div className={cnMainPage()}>
      <GoogleMap token={process.env.REACT_APP_GOOGLE_API_KEY} />
    </div>
  );
};
