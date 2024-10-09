import { defineAction } from "astro:actions";
import { api } from "src/scripts/axios";
import { apiRoutes } from "src/utils/apiRoutes";
import type { AuthUser, IResType } from "src/utils/types";
import { processErrors } from "./processErrors";
import { setCommonHeader } from "./setCommonHeader";
import { fetchApi } from "src/utils/fetchApi";
import { formDataToJson } from "./formDataToJson";

export const authActions = {
  login: defineAction({
    accept: "form",
    handler: async (data, ctx) => {
      return await fetchApi<ILoginResults>(apiRoutes.auth.signin(), {
        method: "POST",
        body: formDataToJson(data),
        headers: {
          ...setCommonHeader(ctx),
        },
      });
    },
  }),

  logout: defineAction({
    accept: "form",
    handler: (): IResType<any> => {
      return { code: 200, success: true, message: "Logout Successfullly" };
    },
  }),
};

export type ILoginResults = { user: AuthUser; token: string };
