import React, { FC } from 'react';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { ErrorBoundary } from './ErrorBoundary/ErrorBoundary';

const App: FC = () => {
  return (
    <Theme preset={presetGpnDefault} className="root">
      <ErrorBoundary>
        <div />
      </ErrorBoundary>
    </Theme>
  );
};

export default App;
