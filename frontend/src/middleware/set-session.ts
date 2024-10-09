import { defineMiddleware } from "astro:middleware";

export const setSession = defineMiddleware((ctx, next) => {
  const user = ctx.cookies.get("user");
  const token = ctx.cookies.get("token");

  if (user?.value) {
    ctx.locals["user"] = user.json();
    ctx.locals.token = token?.value;
    ctx.locals.flashMessage = undefined;
  }

  return next();
});
