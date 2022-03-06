import React from 'react';
import { useRefs } from '@consta/uikit/useRefs';

export const useFocus = (controlsLength: number) => {
  const refs = useRefs<HTMLInputElement | HTMLButtonElement>(controlsLength);

  const onKeyPress = (e: React.KeyboardEvent, index: number) => {
    const ref = refs[index + 1].current;
    if (e.key === 'Enter' && ref) {
      e.preventDefault();
      ref?.[index !== controlsLength - 1 ? 'click' : 'focus']();
    }
  };

  return {
    refs,
    onKeyPress,
  };
};
