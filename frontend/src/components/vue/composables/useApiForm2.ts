import type { AxiosError, AxiosRequestConfig } from "axios";
import { reactive, ref, toRaw, watch } from "vue";
import type { IResType, ValidationErrorObj } from "../../../utils/types";
import { api } from "../../../scripts/axios";
import { toast } from "vue3-toastify";

type FormMethodHandler = (
  url: string,
  config?: AxiosRequestConfig,
  opt?: { onSucess?: (resData: any) => void; onError?: () => void },
) => Promise<void>;

type ProcessFormHandler = (
  method: "post" | "postForm" | "put" | "delete",
  ...arg: Parameters<FormMethodHandler>
) => Promise<void>;

export default function useApiForm2<T extends object>(
  initialForm: T,
  options?: { disableToast?: boolean },
) {
  toast.success("Success");

  const form = reactive(initialForm);
  const res = ref<IResType<any>>();
  const processing = ref(false);
  const errors = ref<ValidationErrorObj>(null);
  const disableToast = ref(options?.disableToast || false);

  const processForm: ProcessFormHandler = async (method, url, config, opt) => {
    processing.value = true;
    errors.value = null;

    try {
      const axiosRes = await api[method]<IResType<any>>(
        url,
        toRaw(form),
        config,
      );

      if (axiosRes.data.success === true) {
        opt?.onSucess && opt.onSucess(axiosRes.data.data);
        if (!disableToast.value) {
          toast.success(axiosRes?.data.message || "Success");
        }
      }
      res.value = axiosRes.data;
    } catch (error: unknown) {
      processError(error, opt?.onError);
    }
    processing.value = false;
  };

  const processError = (error: unknown, onError?: () => void) => {
    const err = error as AxiosError<IResType<any>>;
    const resErrors = err.response?.data?.errors;
    res.value = err.response?.data;

    if (resErrors) {
      errors.value = resErrors;
    } else {
      errors.value = null;
    }

    onError && onError();
    if (!disableToast.value) {
      if (err.response) {
        toast.error(err.response?.data?.message || "Server  Error");
        return;
      }

      if (err.request) {
        toast.error("Request Error");
        return;
      }

      toast.error("Something Went Error");
    }
  };

  const post: FormMethodHandler = async (url, config, opt) => {
    processForm("post", url, config, opt);
  };

  const postForm: FormMethodHandler = async (url, config, opt) => {
    processForm("postForm", url, config, opt);
  };

  const put: FormMethodHandler = async (url, config, opt) => {
    processForm("put", url, config, opt);
  };

  const destroy: FormMethodHandler = async (url, config, opt) => {
    processForm("delete", url, config, opt);
  };

  return { post, postForm, put, destroy, form, errors, processing };
}
