import React, { Component, ErrorInfo } from 'react';

// Define the Props interface including children
interface Props {
  children: React.ReactNode;
}

class ErrorBoundary extends Component<Props> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try again later.</h1>;
    }
    // Render the children when there's no error
    return this.props.children;
  } 
}

export default ErrorBoundary;
