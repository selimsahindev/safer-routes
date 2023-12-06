import axios from '@/libs/axios';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

interface ICredentials {
  email: string | null;
  password: string | null;
}

const sessionDuration = parseInt(`${process.env.SESSION_DURATION}`, 10);

// create authentication options instance
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    // How long until an idle session expires and is no longer valid.
    maxAge: sessionDuration
  },
  providers: [
    CredentialsProvider({
      // Set the type of provider
      type: 'credentials',

      // Leave credentials object empty since we have our own login page.
      credentials: {},

      // Initialize authorize function.
      authorize: async (credentials: Record<never, string> | undefined) => {
        // Get parameters from the credentials object.
        const { email, password } = credentials as ICredentials;

        const url = `api/v1/auth/signin`;

        // Fetch data and return user object. Otherwise throw and error.
        try {
          const res = await axios.post(
            url,
            {
              email: email,
              password: password,
            },
            {
              headers: { 'Accept-Language': 'en-US', },
            }
          );
          const user = res.data;
          if (user) {
            return user;
          }
        } catch (error: any) {
          throw new Error(error.response.data.message);
        }

        return null;
      },
    }),
  ],
  callbacks: {
    // Create JWT object.
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    // Manage session structure.
    async session({ session, token }) {
      session.accessToken = token.token;
      session.user = token.user;
      return session;
    },
  },
};

export default NextAuth(authOptions);
