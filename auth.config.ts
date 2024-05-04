import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      // Protecting the registration path
      const isOnRegistration = nextUrl.pathname.startsWith('/registration');
      if (isOnRegistration) {
        if (isLoggedIn) return true;
        // Redirect unauthenticated users to login page
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/registration', nextUrl));
      }
      return true;
    },
  },
  providers: [],
};
