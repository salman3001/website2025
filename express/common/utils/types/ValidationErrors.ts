type ValidationError = {
  _errors: string[];
};

export type ValidationErrors =
  | (ValidationError & {
      [key: string]: ValidationErrors;
    })
  | null;
