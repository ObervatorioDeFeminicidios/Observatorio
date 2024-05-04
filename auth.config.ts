import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      // Protecting the root path
      const isOnRoot = nextUrl.pathname.startsWith('/');
      if (isOnRoot) {
        if (isLoggedIn) return true;
        // Redirect unauthenticated users to login page
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl));
      }
      return true;
    },
  },
  providers: [],
};
