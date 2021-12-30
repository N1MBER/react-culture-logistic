import React from 'react';
import { Header as ConstaHeader } from '@consta/uikit/Header';
import { cn } from '../../../__private__/utils/bem';
import { HeaderRightSide } from './HeaderRightSide/HeaderRightSide';

import './Header.scss';

const cnHeader = cn('Header');

export const Header = () => {
  return (
    <ConstaHeader className={cnHeader()} rightSide={<HeaderRightSide />} />
  );
};
