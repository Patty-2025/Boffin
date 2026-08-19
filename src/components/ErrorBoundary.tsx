import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-50 border border-red-200 rounded-2xl flex flex-col items-center justify-center text-center space-y-3">
          <AlertTriangle className="text-red-500" size={32} />
          <div>
            <h3 className="font-bold text-red-800 text-sm mb-1">Something went wrong</h3>
            <p className="text-xs text-red-600 max-w-sm">
              {this.props.fallbackMessage || this.state.error?.message || 'An unexpected error occurred while loading this component.'}
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
