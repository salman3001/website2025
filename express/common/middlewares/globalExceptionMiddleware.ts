import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export const globalExceptionMiddleware: ErrorRequestHandler = (
  err,
  _req,
  res,
  next,
) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof ZodError) {
    return res.custom({
      code: 423,
      success: false,
      message: "Validation Failed",
      errors: err.format(),
    });
  }

  res.custom({
    code: 500,
    success: false,
    message: err.message || "Server Error",
  });
};
