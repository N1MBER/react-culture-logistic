import { HeaderLogin, HeaderModule } from '@consta/uikit/Header';
import React from 'react';

type PersonStatus = 'available' | 'remote' | 'out';

type HeaderRightSideProps = {
  isLogged?: boolean;
  name?: string;
  info?: string;
  status?: PersonStatus;
  avatar?: string;
  isMinified?: boolean;
};

export const HeaderRightSide = (props: HeaderRightSideProps) => {
  const { isLogged, name, info, status, avatar, isMinified } = props;
  return (
    <>
      <HeaderModule indent="s">
        <HeaderLogin
          isLogged={isLogged}
          personName={name || 'Михаил Зерно'}
          personInfo={info || 'В другом офисе'}
          personStatus={status || 'available'}
          personAvatarUrl={avatar || 'ссылка на аватарку'}
          isMinified={isMinified}
        />
      </HeaderModule>
    </>
  );
};
