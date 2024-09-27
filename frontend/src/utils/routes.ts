export const routes = {
  web: {
    home: () => "/",
    contact: () => "/contact",
    blogs: () => "/blogs",
    tutorials: () => "/tutorials",
    discussions: () => "/discussions",
    portfolio: () => "/portfolio",
    profile: () => "/profile",
    privacy: () => "/privacy-policy",
  },
  auth: {
    signin: () => "/auth/login",
    signup: () => "/auth/signup",
    forgotPassword: () => "/auth/forgot-password",
    resetPassword: (token: string) => `/auth/reset-password/${token}`,
  },
};
