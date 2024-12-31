import './styles/globals.css';
import ErrorBoundary from './errorBoundary';
import Home from '.';
import { AppProps } from 'next/app';  // Import AppProps type from Next.js

function MyApp({ Component, pageProps }: AppProps) {  // Use AppProps to type Component and pageProps
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}

export default MyApp;
