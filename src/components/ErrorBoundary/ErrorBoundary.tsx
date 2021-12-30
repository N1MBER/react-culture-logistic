import React from 'react';
import { Responses500 } from '@consta/uikit/Responses500';
import './ErrorBoundary.scss';
import { cn } from '../../__private__/utils/bem';

type ErrorBoundaryProps = {
  className?: string;
  children?: React.ReactNode;
};

type State = {
  hasError: boolean;
};

const cnErrorBoundary = cn('ErrorBoundary');

// Здесь необходимо использовать классовый компонент, т.к. в реакт нет реализации error boundary с помощью хуков
export class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  public state: State = {
    hasError: true,
  };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={cnErrorBoundary({}, [this.props.className])}>
          <Responses500 />
        </div>
      );
    }
    return this.props.children;
  }
}
