import { Handler, NextFunction, Request, Response } from "express";

export const defineAsyncHandler = (handler: Handler) => {
  return (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(handler(req, res, next)).catch(next);
};
