import React from 'react';
import { cn } from '../../../__private__/utils/bem';
import { Flex } from '../Flex/Flex';

const cnMainLayout = cn('MainLayout');

export const MainLayout = () => {
  return <Flex direction="column" className={cnMainLayout()} />;
};
