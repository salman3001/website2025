import { sequence } from "astro:middleware";
import { authMiddleware } from "./auth-middleware";
import { authorizationMiddleware } from "./authorization-middleware";

export const onRequest = sequence(authMiddleware, authorizationMiddleware);
