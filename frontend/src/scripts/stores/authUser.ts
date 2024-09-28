import { persistentAtom } from "@nanostores/persistent";
import type { AuthUser } from "../../utils/types";

export const $authUser = persistentAtom<AuthUser | null>("authUser", null, {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const setAuthUser = (user: AuthUser | null) => {
  $authUser.set(user);
};
