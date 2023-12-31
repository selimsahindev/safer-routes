import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();
  const { isAuthenticated, login } = useAuth();

  const inputLabelClasses =
    'block text-sm mb-1 font-medium text-gray-900 dark:text-gray-200';
  const inputClasses =
    'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const baseURL = process.env.NEXT_PUBLIC_API_URL;

    try {
      const response = await axios.post(
        '/api/v1/auth/signin',
        { email, password },
        { baseURL }
      );

      if (response.status === 200) {
        const jwt: string = response.data.token;
        login(jwt);
        router.push('/');
      } else {
        console.error('Login failed.');
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated]);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen">
      {isAuthenticated ? (
        <p>Redirecting...</p>
      ) : (
        <div className="h-full flex flex-col items-center justify-center px-1 md:px-6 py-8 mx-auto md:h-screen lg:py-0">
          <img className="w-8" src="/logo/safer-routes.png" alt="logo" />
          <h1 className="mb-4">Safer Routes</h1>

          {/* Main Card */}
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-2 py-6 sm:p-8 md:p-6 space-y-4 md:space-y-6">
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
                </h1>

                <div>
                  <label htmlFor="email" className={inputLabelClasses}>
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className={inputClasses}
                    placeholder="name@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className={inputLabelClasses}>
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className={inputClasses}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-4 pt-2">
                  <button
                    type="submit"
                    className="w-full text-white bg-teal-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Sign in
                  </button>

                  <p className="text-xs font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?{' '}
                    <a
                      href="/signup"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Sign up
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Login;
