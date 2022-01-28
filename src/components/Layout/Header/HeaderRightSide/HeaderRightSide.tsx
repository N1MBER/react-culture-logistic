import { HeaderLogin, HeaderModule } from '@consta/uikit/Header';
import { ThemeToggler } from '@consta/uikit/ThemeToggler';
import { IconSun } from '@consta/uikit/IconSun';
import { IconMoon } from '@consta/uikit/IconMoon';
import { IconLightningBolt } from '@consta/uikit/IconLightningBolt';
import React, { useContext } from 'react';
import { IconProps } from '@consta/uikit/__internal__/src/icons/Icon/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeName } from '../../../../types/setings';
import { ThemeContext } from '../../../App';
import { RootState } from '../../../../store/reducers';
import { setShowAuth } from '../../../../store/reducers/authReducer';

type PersonStatus = 'available' | 'remote' | 'out';

type HeaderRightSideProps = {
  isLogged?: boolean;
  name?: string;
  info?: string;
  status?: PersonStatus;
  avatar?: string;
  isMinified?: boolean;
};

type ThemeData = {
  label: string;
  icon: React.FC<IconProps>;
};

const getDataOfTheme = (theme: ThemeName): ThemeData => {
  if (theme === 'Default') {
    return {
      label: 'Светлая',
      icon: IconSun,
    };
  }
  if (theme === 'Dark') {
    return {
      label: 'Темная',
      icon: IconMoon,
    };
  }
  return {
    label: 'Системная',
    icon: IconLightningBolt,
  };
};

export const themes: ThemeName[] = ['Default', 'Dark', 'System'];

export const HeaderRightSide = (props: HeaderRightSideProps) => {
  const { isLogged, name, info, status, avatar, isMinified } = props;

  const { theme, setTheme } = useContext(ThemeContext);

  const isAuthorized = useSelector(
    (store: RootState) => store.auth.isAuthorized
  );

  const dispatch = useDispatch();

  const handleClick = () => {
    if (!isAuthorized) {
      dispatch(setShowAuth(true));
    }
  };

  return (
    <>
      <HeaderModule indent="s">
        <ThemeToggler
          size="s"
          items={themes}
          value={theme}
          onChange={({ value }) => setTheme(value as ThemeName)}
          getItemIcon={(theme) => getDataOfTheme(theme as ThemeName).icon}
          getItemLabel={(theme) => getDataOfTheme(theme as ThemeName).label}
        />
      </HeaderModule>
      <HeaderModule indent="s">
        <HeaderLogin
          isLogged={isLogged}
          personName={name || 'Михаил Зерно'}
          personInfo={info || 'В другом офисе'}
          personStatus={status || 'available'}
          personAvatarUrl={avatar || 'ссылка на аватарку'}
          isMinified={isMinified}
          onClick={handleClick}
        />
      </HeaderModule>
    </>
  );
};
