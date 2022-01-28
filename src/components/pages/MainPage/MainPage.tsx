import React from 'react';
import { SearchPlaceContainer } from '../../SearchPlaceContainer/SearchPlaceContainer';
import { cn } from '../../../__private__/utils/bem';

const cnMainPage = cn('MainPage');

export const MainPage = () => {
  return (
    <div className={cnMainPage()}>
      <SearchPlaceContainer />
    </div>
  );
};
