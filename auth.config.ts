import type { NextAuthConfig } from 'next-auth';
import { API_ROUTES } from './app/api';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: API_ROUTES.login,
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      // Protecting the path
      const isOnRegistration = nextUrl.pathname.startsWith(API_ROUTES.dashboard);
      if (isOnRegistration) {
        if (isLoggedIn) return true;
        // Redirect unauthenticated users to login page
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL(API_ROUTES.registration, nextUrl));
      }
      return true;
    },
  },
  providers: [],
};
