import type { AppProps } from 'next/app';
import React from 'react';
import '../styles/globals.css';

/**
 * Renders the main application component.
 *
 * @param {AppProps} props - The component props.
 * @returns {React.JSX.Element} The rendered component.
 */
export default function App({ Component, pageProps }: AppProps): React.JSX.Element {
    return <Component { ...pageProps } />;
}