import cookie from 'cookie';

// Log in the user by setting the token cookie.
export const setToken = (token: string) => {
  const jwtExpiry =
  parseInt(process.env.NEXT_PUBLIC_JWT_EXPIRY_TIME as string, 10) || 3600;

  document.cookie = cookie.serialize('token', token, {
    maxAge: jwtExpiry,
    path: '/',
  });
};

// Log out the user by removing the token cookie.
export const removeToken = () => {
  document.cookie = cookie.serialize('token', '', {
    maxAge: -1,
    path: '/',
  });
};

// Get the logged in user token from the cookie.
export const getToken = () => {
  return cookie.parse(document.cookie).token;
};
