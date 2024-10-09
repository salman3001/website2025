import type { ActionAPIContext } from "astro:actions";
import type { AxiosRequestConfig } from "axios";

export const setCommonHeader = (
  ctx: ActionAPIContext,
): RequestInit["headers"] => {
  const token = ctx.locals.token;
  const authHeader = token
    ? { Authorization: `Brearer ${token}` }
    : ({} as any);
  return { ...authHeader, "Content-type": "application/json" };
};
