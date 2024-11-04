import type { NextAuthConfig } from 'next-auth';
import { API_ROUTES } from './app/api';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: API_ROUTES.login,
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Redirect to the specified URL, defaulting to the dashboard on sign-in
      if (url.startsWith(baseUrl)) return url;
      return baseUrl + API_ROUTES.dashboard;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith(API_ROUTES.dashboard);

      // Handle unauthorized access by redirecting to login if accessing protected routes
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL(API_ROUTES.registration, nextUrl));
      }

      return true;
    },
  },
  providers: [],
};
