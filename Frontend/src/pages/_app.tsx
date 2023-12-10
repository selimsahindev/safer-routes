import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import '@/styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.title = 'Safer Routes | Login';
  }, []);

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  return (
    <>
      <script
        src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`}
      ></script>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default App;
