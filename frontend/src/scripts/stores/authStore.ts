import { persistentAtom } from "@nanostores/persistent";
import type { AuthUser } from "../../utils/types";

export const $authStore = persistentAtom<{
  user: AuthUser;
  token: string;
} | null>("authUser", null, {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const setAuth = (payload: { user: AuthUser; token: string } | null) => {
  if (payload) {
    const cookieUser = JSON.stringify(payload.user);
    const cookie = `user=${cookieUser}; path=/; SameSite=Lax`;
    document.cookie = cookie;
    $authStore.set(payload);
  } else {
    const cookie = `user=; path=/; SameSite=Lax`;
    document.cookie = cookie;
    $authStore.set(payload);
  }
};
