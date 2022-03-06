import { IconSearch } from '@consta/uikit/IconSearch';
import { TextField } from '@consta/uikit/TextField';
import React from 'react';
import { cn } from '../../../__private__/utils/bem';

import './PlaceBarSearchField.scss';

export type SearchParam = {
  placeName?: string | null;
};

type Props = {
  searchParam: SearchParam;
  className?: string;
  onChange?: (value: SearchParam) => void;
  onSubmit?: (value: string) => void;
};

const cnPlaceBarSearchField = cn('PlaceBarSearchField');

export const PlaceBarSearchField = (props: Props) => {
  const { searchParam, onChange, className, onSubmit } = props;

  const handleTextChange = (value: string | null) => {
    onChange?.({ ...searchParam, placeName: value });
  };

  const handleSumnit = () => {
    onSubmit?.(searchParam.placeName ?? '');
  };

  return (
    <div className={cnPlaceBarSearchField(null, [className])}>
      <TextField
        type="text"
        placeholder="Поиск"
        label="Поиск мест"
        width="full"
        rightSide={IconSearch}
        value={searchParam.placeName}
        onKeyPress={(e) => e.key === 'Enter' && handleSumnit()}
        onChange={({ value }) => handleTextChange(value)}
      />
      <button
        type="button"
        onClick={handleSumnit}
        className={cnPlaceBarSearchField('Button')}
      />
    </div>
  );
};
