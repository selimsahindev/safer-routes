import axios from '@/libs/axios';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useAxiosAuth = () => {
  const { data: session } = useSession();
  const { locale } = useRouter();

  useEffect(() => {
    const requestIntercept = axios.interceptors.request.use((config) => {
      if (!config.headers['Authorization']) {
        config.headers['Authorization'] = `Bearer ${session?.accessToken}`;
      }
      if (!config.headers['Accept-Language']) {
        config.headers['Accept-Language'] = locale;
      }
      return config;
    });

    return () => {
      axios.interceptors.request.eject(requestIntercept);
    };
  }, [session]);

  return axios;
};

export default useAxiosAuth;
