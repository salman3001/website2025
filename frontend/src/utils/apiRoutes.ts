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
  media: {
    index: () => `/media`,
    create: () => `/media`,
    view: (id: number) => `/media/${id}`,
    update: (id: number) => `/media/${id}`,
    delete: (id: number) => `/media/${id}`,
  },
};
