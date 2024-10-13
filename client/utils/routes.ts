import { categories } from "@vueuse/core/metadata.cjs";

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
    checkEmail: () => `/auth/check-email/`,
  },
  admin: {
    dashboard: () => "/admin/dashboard",
    blogs: {
      index: () => "/admin/blogs",
      view: (slug: string) => `/admin/blogs/${slug}`,
      create: () => "/admin/blogs/create",
      edit: (slug: string) => `/admin/blogs/${slug}/edit`,
    },
    blogCategories: {
      index: () => "/admin/blog-categories",
      view: (slug: string) => `/admin/blog-categories/${slug}`,
      create: () => "/admin/blog-categories/create",
      edit: (slug: string) => `/admin/blog-categories/${slug}/edit`,
    },
    tags: {
      index: () => "/admin/tags",
      view: (slug: string) => `/admin/tags/${slug}`,
      create: () => "/admin/tags/create",
      edit: (slug: string) => `/admin/tags/${slug}/edit`,
    },
    projects: {
      index: () => "/admin/projects",
      view: (id: number) => `/admin/projects/${id}`,
      create: () => "/admin/projects/create",
      edit: (id: number) => `/admin/projects/${id}/edit`,
    },
  },
};
