import cookie from 'cookie';

// Log in the user by setting the token cookie.
export const login = (token: string) => {
  const jwtExpiry =
    parseInt(process.env.NEXT_PUBLIC_JWT_EXPIRY_TIME as string, 10) || 3600;

  document.cookie = cookie.serialize('token', token, {
    maxAge: jwtExpiry,
    path: '/',
  });
};

// Log out the user by removing the token cookie.
export const logout = () => {
  document.cookie = cookie.serialize('token', '', {
    maxAge: -1,
    path: '/',
  });
};
