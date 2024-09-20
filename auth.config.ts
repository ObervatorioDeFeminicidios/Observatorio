import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      // Protecting the path
      const isOnRegistration = nextUrl.pathname.startsWith('/dashboard');
      if (isOnRegistration) {
        if (isLoggedIn) return true;
        // Redirect unauthenticated users to login page
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard/registration', nextUrl));
      }
      return true;
    },
  },
  providers: [],
};
