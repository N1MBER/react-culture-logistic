import { Modal } from '@consta/uikit/Modal';
import React from 'react';

type Props = {
  isOpen: boolean;
  changeVisible: (flag: boolean) => void;
  image: string;
};

export const MapPlaceImage = (props: Props) => {
  const { isOpen, changeVisible, image } = props;
  return (
    <Modal
      style={{ zIndex: 2000 }}
      isOpen={isOpen}
      onClickOutside={() => changeVisible(false)}
    >
      <div>
        <img style={{ minWidth: 600 }} src={image} alt={image} />
      </div>
    </Modal>
  );
};
