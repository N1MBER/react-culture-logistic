import React, { FC, useState } from 'react';
import {
  Theme,
  presetGpnDefault,
  presetGpnDark,
  presetGpnDisplay,
} from '@consta/uikit/Theme';
import { ErrorBoundary } from './ErrorBoundary/ErrorBoundary';
import { Header } from './Layout/Header/Header';
import { MainLayout } from './Layout/MainLayout/MainLayout';
import { ThemeName } from '../types/setings';
import { ModalController } from './ModalController/ModalController';

export const ThemeContext = React.createContext({
  theme: 'Default',
  setTheme: (_theme: 'Default' | 'Dark' | 'System') => {},
});

const App: FC = () => {
  const [theme, setTheme] = useState<ThemeName>('Default');

  const getPresetByTheme = () => {
    if (theme === 'Dark') return presetGpnDark;
    if (theme === 'Default') return presetGpnDefault;
    return presetGpnDisplay;
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Theme preset={getPresetByTheme()} className="root">
        <Header />
        <ErrorBoundary>
          <MainLayout />
        </ErrorBoundary>
        <ModalController />
      </Theme>{' '}
    </ThemeContext.Provider>
  );
};

export default App;
