import React, { useState } from 'react';
import { TextFieldPropStatus } from '@consta/uikit/__internal__/src/components/TextField/helpers';
import { TextField } from '@consta/uikit/TextField';
import { Radio } from '@consta/uikit/Radio';
import { Checkbox } from '@consta/uikit/Checkbox';

import { Sidebar } from '@consta/uikit/Sidebar';
import { FilterInputType } from '../../../types/filters';

export type DefaultFilterItem = {
  inputType?: FilterInputType;
  label?: string;
  caption?: string;
  status?: TextFieldPropStatus;
  elements?: DefaultFilterItem;
};

export type FilterBarRender = <ITEM extends DefaultFilterItem>(props: {
  items: ITEM[];
  onSubmit?: (values: ITEM[]) => void;
  isOpen?: boolean;
  hasOverlay?: boolean;
  position?: 'right' | 'bottom' | 'left' | 'top';
  closeBar?: () => void;
}) => React.ReactElement | null;

export const FilterBar: FilterBarRender = (props) => {
  const {
    isOpen,
    onSubmit,
    items,
    hasOverlay = false,
    position = 'right',
    closeBar,
  } = props;

  const [values, setValues] = useState<{ [key: string]: string | number }>();

  return (
    <Sidebar
      isOpen={isOpen}
      hasOverlay={hasOverlay}
      position={position}
      onEsc={() => closeBar?.()}
    />
  );
};
