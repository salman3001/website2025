/// <reference path="../.astro/types.d.ts" />

import type { AuthUser } from "./utils/types";

declare global {
  namespace App {
    interface Locals {
      user?: AuthUser;
      token?: string;
      flashMessage?: {
        type: "success" | "info" | "warning" | "error";
        message: string;
      };
    }
  }
}
