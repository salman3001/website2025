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
  blogCategory: {
    index: () => `/blog-categories`,
    create: () => `/blog-categories`,
    view: (slug: string) => `/blog-categories/${slug}`,
    update: (slug: string) => `/blog-categories/${slug}`,
    delete: (slug: string) => `/blog-categories/${slug}`,
  },
  media: {
    index: () => `/media`,
    create: () => `/media`,
    view: (id: number) => `/media/${id}`,
    update: (id: number) => `/media/${id}`,
    delete: (id: number) => `/media/${id}`,
  },
  mediaCategory: {
    index: () => `/media-categories`,
    create: () => `/media-categories`,
    view: (id: number) => `/media-categories/${id}`,
    update: (id: number) => `/media-categories/${id}`,
    delete: (id: number) => `/media-categories/${id}`,
  },
  tags: {
    index: () => `/tags`,
    create: () => `/tags`,
    view: (slug: string) => `/tags/${slug}`,
    update: (slug: string) => `/tags/${slug}`,
    delete: (slug: string) => `/tags/${slug}`,
  },
};
