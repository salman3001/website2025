import { defineMiddleware } from "astro:middleware";

export const authMiddleware = defineMiddleware((ctx, next) => {
  const user = ctx.cookies.get("user");

  if (user?.value) {
    ctx.locals["user"] = user.json();
  }

  next();
});
