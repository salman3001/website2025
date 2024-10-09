import { sequence } from "astro:middleware";
import { setSession } from "./set-session";
import { authorizationMiddleware } from "./authorization-middleware";

export const onRequest = sequence(setSession, authorizationMiddleware);
