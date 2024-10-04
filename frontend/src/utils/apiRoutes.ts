export const apiRoutes = {
  auth: {
    signin: () => "/auth/login",
    signup: () => "/auth/register",
    confirmEmail: () => "confirm-email",
    forgotPassword: () => "/auth/forgot-password",
    resetPassword: () => `/auth/reset-password/`,
  },
  blogs: {
    index: () => `/blogs`,
    create: () => `/blogs`,
    view: (slug: string) => `/blogs/${slug}`,
    update: (slug: string) => `/blogs/${slug}`,
    delete: (slug: string) => `/blogs/${slug}`,
  },
};
