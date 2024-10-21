import { response } from "express";
import { ValidationErrors } from "common/utils/types/ValidationErrors.ts";
import { ZodFormattedError } from "zod";

interface ResType<T> {
  code: number;
  success: boolean;
  message?: string;
  data?: T | null;
  errors?: ZodFormattedError;
}

declare global {
  namespace Express {
    interface Response {
      custom: (opts: ResType<any>) => void;
    }
  }
}
