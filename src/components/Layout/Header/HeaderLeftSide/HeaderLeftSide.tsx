import React from 'react';
import { cn } from '../../../../__private__/utils/bem';
import { Logo } from '../../../common/Logo/Logo';

import './HeaderLeftSide.scss';

const cnHeaderLeftSide = cn('HeaderLeftSide');

export const HeaderLeftSide = () => {
  return (
    <div className={cnHeaderLeftSide()}>
      <button className={cnHeaderLeftSide('Logo')} type="button">
        <Logo />
      </button>
    </div>
  );
};
