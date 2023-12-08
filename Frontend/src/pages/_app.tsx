import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import '@/pages/globals.css';

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.title = 'Safer Routes | Login';
  }, []);

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default App;
