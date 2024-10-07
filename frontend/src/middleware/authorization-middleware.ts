import { defineMiddleware } from "astro:middleware";
import { UserType } from "src/utils/enums";
import { routes } from "src/utils/routes";

export const authorizationMiddleware = defineMiddleware((ctx, next) => {
  const path = ctx.url.pathname;
  const user = ctx.locals?.user;
  const authPaths = ["/admin/.*", "/profile/.*"];

  const adminPaths = ["/admin/.*", "/profile/.*"];

  const guestPaths = ["/auth/.*"];

  const matchesPath = (paths: string[], path: string) =>
    paths.some((pattern) => new RegExp(pattern).test(path));

  // Check if the path is in the guest paths
  if (matchesPath(guestPaths, path)) {
    // If the user is authenticated, redirect them away from guest paths
    if (user) {
      return next(routes.web.home()); // Redirect authenticated users home page
    }
  }

  // Check if the path is in the auth paths (for authenticated users only)
  if (matchesPath(authPaths, path)) {
    // If the user is not authenticated, redirect to login
    if (!user) {
      return next(routes.auth.signin()); // Redirect to login page
    }
  }

  // Check if the path is in the admin paths
  if (matchesPath(adminPaths, path)) {
    // If the user is not an admin, block access
    if (user?.userType !== UserType.Admin) {
      return next("/not-authorized"); // Redirect to a not authorized page or handle it otherwise
    }
  }

  return next();
});
