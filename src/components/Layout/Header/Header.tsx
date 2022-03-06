import React from 'react';
import { Header as ConstaHeader } from '@consta/uikit/Header';
import { useSelector } from 'react-redux';
import { cn } from '../../../__private__/utils/bem';
import { HeaderRightSide } from './HeaderRightSide/HeaderRightSide';
import { HeaderLeftSide } from './HeaderLeftSide/HeaderLeftSide';
import { RootState } from '../../../store/reducers';

import './Header.scss';

const cnHeader = cn('Header');

export const Header = () => {
  const { user, isAuthorized } = useSelector((store: RootState) => store.auth);

  return (
    <ConstaHeader
      className={cnHeader()}
      leftSide={<HeaderLeftSide />}
      rightSide={<HeaderRightSide isLogged={isAuthorized} name={user?.email} />}
    />
  );
};
