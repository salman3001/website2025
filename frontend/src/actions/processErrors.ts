import type { AxiosError } from "axios";
import type { IResType } from "src/utils/types";

export const processErrors = (error: any) => {
  const err = error as AxiosError<IResType<any>>;

  if (err.response) {
    return err.response.data;
  }

  if (err.request) {
    return { code: 424, success: false, message: "Request Error" };
  }

  return { code: 500, success: false, message: "Server Error" };
};
