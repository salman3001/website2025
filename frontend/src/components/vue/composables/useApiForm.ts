import type { AxiosError, AxiosRequestConfig } from "axios";
import { reactive, watch } from "vue";
import type { IResType, ValidationErrorObj } from "../../../utils/types";
import { api } from "../../../scripts/axios";
import { pickKeysFromReference } from "../../../utils/helpers";
import { toast } from "vue3-toastify";

export default function useApiForm<T extends object>(
  initialForm: T,
  options?: { disableToast?: boolean },
) {
  const formObject = reactive({
    ...initialForm,
    res: undefined as undefined | IResType<any>,
    processing: false,
    errors: null as ValidationErrorObj,
    disableToast: options?.disableToast || false,

    async post(
      url: string,
      config?: AxiosRequestConfig,
      opt?: { onSucess?: (resData: any) => void; onError?: () => void },
    ) {
      this.errors = null;
      this.processing = true;
      try {
        const res = await api.post<IResType<any>>(
          url,
          pickKeysFromReference(this, initialForm),
          config,
        );
        if (res.data.success === true) {
          opt?.onSucess && opt.onSucess(res.data.data);
        }
        this.res = res.data;
        toast.success(this?.res?.message || "Success");
      } catch (error: unknown) {
        this.processError(error, opt?.onError);
      }
      this.processing = false;
    },

    async postForm(
      url: string,
      config?: AxiosRequestConfig,
      opt?: { onSucess?: (resData: any) => void; onError?: () => void },
    ) {
      this.errors = null;
      this.processing = true;
      try {
        const res = await api.postForm<IResType<any>>(
          url,
          pickKeysFromReference(this, initialForm),
          config,
        );
        if (res.data.success === true) {
          opt?.onSucess && opt.onSucess(res.data.data);
        }
        this.res = res.data;
        toast.success(this?.res?.message || "Success");
      } catch (error: unknown) {
        this.processError(error, opt?.onError);
      }
      this.processing = false;
    },

    async put(
      url: string,
      config?: AxiosRequestConfig,
      opt?: { onSucess?: (resData: any) => void; onError?: () => void },
    ) {
      this.errors = null;
      this.processing = true;
      try {
        const res = await api.put<IResType<any>>(
          url,
          pickKeysFromReference(this, initialForm),
          config,
        );
        if (res.data.success === true) {
          opt?.onSucess && opt.onSucess(res?.data?.data);
        }
        this.res = res.data;
        toast.success(this?.res?.message || "Success");
      } catch (error: unknown) {
        this.processError(error, opt?.onError);
      }
      this.processing = false;
    },
    async delete(
      url: string,
      config?: AxiosRequestConfig,
      opt?: { onSucess?: (resData: any) => void; onError?: () => void },
    ) {
      this.errors = null;
      this.processing = true;
      try {
        const res = await api.delete<IResType<any>>(url, config);
        if (res.data.success === true) {
          opt?.onSucess && opt.onSucess(res?.data?.data);
        }
        this.res = res.data;
        toast.success(this?.res?.message || "Success");
      } catch (error: unknown) {
        this.processError(error, opt?.onError);
      }
      this.processing = false;
    },

    processError(error: unknown, onError?: () => void) {
      const err = error as AxiosError<IResType<any>>;
      const errors = err.response?.data?.errors;
      this.res = err.response?.data;

      if (errors) {
        this.errors = errors;
      } else {
        this.errors = null;
      }

      onError && onError();

      if (err.response) {
        toast.error(err.response?.data?.message || "Server  Error");
        return;
      }

      if (err.request) {
        toast.error("Request Error");
        return;
      }

      toast.error("Something Wenr Error");
    },
  });

  return formObject;
}
